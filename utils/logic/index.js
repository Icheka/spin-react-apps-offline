const _7zip = require("7zip-min");
const ora = require("ora");
const chalk = require("chalk");
const child_process = require("child_process");
const fs = require("fs");
const path = require("path");

const { drawLoadingScreen, drawWelcomeScreen, writeToConsole, writeProjectExecInstructions } = require("../ui/index");

class Logic {


    /**
     * 
     * @param {*string} FROM path to the compressed folder to unzip
     * @param {*string} DIRECTORY_NAME name of the output directory after de-compression
     */
    unzip(FROM, DIRECTORY_NAME, commandsFileName) {
        const TO = path.join(process.cwd(), DIRECTORY_NAME);
        const spinner = ora("Doing something useful...!");
        spinner.start();
        let message;

        console.log("\nTO: ", TO)
        console.log("\n FROM: ", FROM)

        _7zip.unpack(FROM, TO, (err, result) => {
            if (err) {
                message = chalk.white.bold(`:( An error occurred \n\n:>> ${err}`);
                writeToConsole(message);
                spinner.stop();
            } else {
                spinner.stop();
                message = `SUCCESS!\n\nYou spun a new React app!`;
                writeToConsole(message);
                writeProjectExecInstructions(DIRECTORY_NAME);
                this.makeNodeModulesExecutable(DIRECTORY_NAME);
        
                let commandsFilePath = path.join(process.cwd(), 'src', 'commands', commandsFileName);
                let targetCommandsFilePath = path.join(process.cwd(), DIRECTORY_NAME, 'spin.commands.md');
                this.createCommandsFile(commandsFilePath, targetCommandsFilePath);
            }
        });
    }

    makeNodeModulesExecutable(DIRECTORY) {
        child_process.exec("sudo chmod -R 777 /usr/local/bin/npm", (err, stdout, stderr) => {
            if (err) console.log("");
        });
        child_process.exec("cd && chmod +x node_modules/.bin/react-scripts", (err, stdout, stderr) => {
            if (err) console.log("");
        });
    }

    async createCommandsFile(SOURCE_DIRECTORY, DIRECTORY_TARGET) {
        let fileReadStream = fs.createReadStream(SOURCE_DIRECTORY, 'utf8');
        fileReadStream.on('error', err => 1 + 1);

        let fileWriteStream = fs.createWriteStream(DIRECTORY_TARGET);
        fileWriteStream.on('error', err => console.log("Write Commands Error: ", err));

        fileReadStream.pipe(fileWriteStream);
    }
}



module.exports = new Logic();