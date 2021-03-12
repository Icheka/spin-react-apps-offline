#!/usr/bin/env node

const ora = require("ora");
const inquirer = require("inquirer");
const Engine = require("./utils/engine");
const path = require("path");
const PackageDataManipulator = require("./utils/logic/packageDataManipulator");
const fs = require("fs-extra");
const { writeToConsole } = require("./utils/ui/index");
const { extname } = require("path");
const manipulator = new PackageDataManipulator();
const sluggify = (str) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Project Name: ",
      default: "Ant Project",
    },
    {
      type: "input",
      name: "version",
      message: "Project Version:",
      default: "1.0.0",
    },
    {
      type: "input",
      name: "description",
      message: "Description:",
      default: "A fine React app spun with Spin React Apps Offline",
    },
    {
      type: "input",
      name: "repository",
      message: "Remote repository:",
      default: "A fine React app spun with Spin React Apps Offline",
    },
    {
      type: "checkbox",
      name: "extras",
      message: "Select an extra package(s) to install alongside:",
      choices: [
        { name: "Axios", value: "axios" },
        { name: "React Router Dom", value: "react-router-dom" },
      ],
    },
  ])
  .then((answers) => {
    projectName = sluggify(answers.name);
    projectPath = `${process.cwd()}/${projectName}`;
    fs.remove(projectPath).then(() => {
      Engine.__Blank(projectName).then(() => {
        answers.extras.map((extraName) => {
          let projectNodeModulesPath = projectPath + "/node_modules";
          let extraOutputPath = `${projectPath}/.${extraName}`;
          let extraOutputNodeModulesPath = extraOutputPath + "/node_modules";
          Engine.__Extras(projectName, extraName).then(() => {
            fs.copySync(extraOutputNodeModulesPath, projectNodeModulesPath);
            manipulator
              .updateDependencies(
                `${projectPath}/package.json`,
                `${extraOutputPath}/${extraName}.json`
              )
              .then(() => {
                manipulator
                  .updateLockPackages(
                    `${projectPath}/package-lock.json`,
                    `${extraOutputPath}/${extraName}-lock.json`
                  )
                  .then(() => {});
              });
          });
        });
      });
      const cleanup = ora("Cleaning up temp files");
      cleanup.start();
      answers.extras.map((extraName) => {
        let extraOutputPath = `${projectPath}/.${extraName}`;
        fs.removeSync(extraOutputPath);
      });
      cleanup.stop();
      message = `SUCCESS!\n\nYou spun a new React app!`;
      writeToConsole(message);
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
