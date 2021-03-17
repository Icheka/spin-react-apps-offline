#!/usr/bin/env node

const fs = require("fs-extra");
const inquirer = require("inquirer");
const engine = require("./utils/engine");
const { writeToConsole } = require("./utils/ui/index");
const questions = require("./utils/logic/questionaire");
const manipulator = require("./utils/logic/packageDataManipulator");
const sluggify = (str) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
inquirer
  .prompt(questions)
  .then((answers) => {
    projectName = sluggify(answers.name);
    projectPath = `${process.cwd()}/${projectName}`;
    fs.remove(projectPath).then(() => {
      const Engine = new engine(projectName);
      Engine.applyBlank()
        .then(() => {
          answers.extras.map((extraName) => {
            let projectNodeModulesPath = projectPath + "/node_modules";
            let extraOutputPath = `${projectPath}/.${extraName}`;
            let extraOutputNodeModulesPath = extraOutputPath + "/node_modules";
            Engine.applyExtras(extraName)
              .then(() => {
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
              })
              .then(() => {
                fs.removeSync(extraOutputPath);
              });
          });
        })
        .then(() => {
          const attrib = {
            name: projectName,
            version: answers.version,
            author: answers.author,
            repository: answers.repository,
            description: answers.description,
          };
          Engine.applyAttributes(attrib).then(() => {
            message = `SUCCESS!\n\nYou spun a new React app!`;
            writeToConsole(message);
          });
        });
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
