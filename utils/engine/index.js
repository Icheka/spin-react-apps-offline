const ora = require("ora");
const path = require("path");

const Logic = require("../logic/index");
const { drawLoadingScreen, drawWelcomeScreen, writeToConsole, writeProjectExecInstructions } = require("../ui/index");

class Engine {
    constructor() {
        this._barebones_dir = path.join(__dirname, 'src', 'barebones.7z');
    }

    startEngine() {
        drawWelcomeScreen();
    }

    /**
     * 
     * @param {string} PROJECT_NAME name of the project, from terminal args
     */
    __BareBones(PROJECT_NAME) {
        drawLoadingScreen();
        Logic.unzip(this._barebones_dir, PROJECT_NAME, 'barebones.commands.md');
    }
}


module.exports = new Engine();