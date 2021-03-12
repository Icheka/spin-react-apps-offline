const ora = require("ora");
const path = require("path");

const Logic = require("../logic/decompressor");
const {
  drawLoadingScreen,
  drawWelcomeScreen,
  writeToConsole,
  writeProjectExecInstructions,
} = require("../ui/index");

const Extras = ["axios", "react-router-dom"];
class Engine {
  constructor() {
    this._barebones_dir = path.join(__dirname, "src", "barebones.7z");
    this._blank_dir = path.join(__dirname, "src", "blank.7z");
  }

  startEngine() {
    drawWelcomeScreen();
  }

  /**
   *
   * @param {string} PROJECT_NAME name of the project, from terminal args
   */
  __BareBones(PROJECT_NAME) {
    // return console.log("Barebones project :>>", PROJECT_NAME)
    drawLoadingScreen();
    Logic.unzip(this._barebones_dir, PROJECT_NAME, "barebones.commands.md");
  }

  /**
   *
   * @param {string} projectName name of the project from inquirer
   */
  __Blank(projectName) {
    return new Promise((resolve, reject) => {
      drawLoadingScreen();
      const blankPath = this._blank_dir;
      const outputPath = process.cwd() + "/" + projectName;
      const message = {
        init: `Spining: ${projectName}...`,
        success: `Spinning: ${projectName} Completed`,
        error: `Error Spinning ${projectName}`,
      };
      Logic.unzip(blankPath, outputPath, message)
        .then(() => {
          resolve(this);
        })
        .catch(() => {
          reject(this);
        });
    });
  }

  /**
   *
   * @param {string} projectName name of the project, from terminal args
   * @param {string} extraName name of the project, from terminal args
   */
  __Extras(projectName, extraName) {
    return new Promise((resolve, reject) => {
      drawLoadingScreen();
      if (Extras.includes(extraName)) {
        const extraPath = path.join(__dirname, "src", `${extraName}.7z`);
        const outputPath = `${process.cwd()}/${projectName}/.${extraName}`;
        const message = {
          init: `Unpacking: ${extraName}...`,
          success: `Unpacking: ${extraName} Completed`,
          error: `Error Unpacking ${extraName}`,
        };
        Logic.unzip(extraPath, outputPath, message)
          .then(() => {
            resolve(this);
          })
          .catch(() => {
            reject(this);
          });
      } else {
        reject(this);
      }
    });
  }
}

module.exports = new Engine();
