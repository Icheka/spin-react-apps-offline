const path = require("path");

const Logic = require("../logic/decompressor");
const manipulator = require("../logic/packageDataManipulator");
const { drawLoadingScreen, drawWelcomeScreen } = require("../ui/index");

const Extras = ["axios", "react-router-dom"];
class Engine {
  constructor(projectName) {
    this.projectName = projectName;
    this.projectPath = process.cwd() + "/" + this.projectName;
    this._barebones_dir = path.join(__dirname, "src", "barebones.7z");
    this._blank_dir = path.join(__dirname, "src", "blank.7z");
  }

  startEngine() {
    drawWelcomeScreen();
  }

  /**
   *
   * Unpacks the blank template
   */
  applyBlank() {
    return new Promise((resolve, reject) => {
      drawLoadingScreen();
      const blankPath = this._blank_dir;
      const outputPath = this.projectPath;
      const message = {
        init: `Spining: ${this.projectName}...`,
        success: `Spinning: ${this.projectName} Completed`,
        error: `Error Spinning ${this.projectName}`,
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
   * @param {string} extraName name of the extra package to unpack
   */
  applyExtras(extraName) {
    return new Promise((resolve, reject) => {
      drawLoadingScreen();
      if (Extras.includes(extraName)) {
        const extraPath = path.join(__dirname, "src", `${extraName}.7z`);
        const outputPath = `${this.projectPath}/.${extraName}`;
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

  /**
   *
   * @param {Object} projectDetails name of the project, from terminal args
   */
  applyAttributes(projectDetails) {
    return new Promise((resolve, reject) => {
      drawLoadingScreen();
      manipulator
        .updateProjectDetail(this.projectPath, projectDetails)
        .then(() => {
          resolve(true);
        });
    });
  }
}

module.exports = Engine;
