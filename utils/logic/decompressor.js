const _7zip = require("7zip-min");
const ora = require("ora");
const chalk = require("chalk");
const child_process = require("child_process");
const fs = require("fs-extra");

const { writeToConsole } = require("../ui/index");

class Logic {
  /**
   *
   * @param {*string} sourcePath path to the compressed folder to unzip
   * @param {*string} outputPath name of the output directory after de-compression
   * @param {*string} message contains message to output to the console init,success,error
   */
  unzip(sourcePath, outputPath, message) {
    return new Promise((resolve, reject) => {
      const spinner = ora(message.init);
      spinner.start();
      _7zip.unpack(sourcePath, outputPath, (err) => {
        if (err) {
          message = chalk.white.bold(`${message.error}  \n\n:>> ${err}`);
          writeToConsole(message);
          spinner.stop();
          reject(this);
        } else {
          spinner.stop();
          message = `SUCCESS!\n\n${message.success}`;
          writeToConsole(message);
          resolve(this);
        }
      });
    });
  }

  makeNodeModulesExecutable(DIRECTORY) {
    child_process.exec(
      "sudo chmod -R 777 /usr/local/bin/npm",
      (err, stdout, stderr) => {
        if (err) console.log("");
      }
    );
    child_process.exec(
      "cd && chmod +x node_modules/.bin/react-scripts",
      (err, stdout, stderr) => {
        if (err) console.log("");
      }
    );
  }
}

module.exports = new Logic();
