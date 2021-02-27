const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const boxen=require("boxen");

const log = console.log;

class UI {

    /**
     * Render the 'welcome' screen
     */
    drawWelcomeScreen() {
        clear();
        log(chalk.yellowBright(" ============================================================ "));
        log(
            chalk.yellowBright(
                figlet.textSync("  >  S P I N  <", {
                    horizontalLayout: 'full'
                })
            )
        );
        log(chalk.yellowBright(" ============================================================ "));
    }
    
    /**
     * Render the 'please-wait' screen
     */
    drawLoadingScreen() {
        clear();
        const message = `
    P L E A S E ,  W A I T  W H I L E  
    
                S P I N  R E A C T  A P P  O F F L I N E  
    
                            D O E S  H E R  M A G I C . . .
    `;
        log(
            chalk.yellowBright(message)
        );
    }
    

    /**
     * 
     * Outputs a stylized message to the console
     * @param {string} message message to output to the console
     */
    writeToConsole(message, type="success") {
        let config;
        switch (type) {
            case "success":
                config = {
                    margin: 1,
                    padding: 1,
                    borderStyle: "round",
                    borderColor: "yellow",
                    align: "center"
                };
    
                break;
    
            case "failure":
                config = {
                    margin: 1,
                    padding: 1,
                    borderStyle: "round",
                    borderColor: "white",
                    align: "center"
                };
    
                break;
        
            default:
                log("Invalid message type!");
                return 1;
                break;
        }
    
        const messageBox = boxen(message, config);
        log(messageBox);
        return 0;
    }

    /**
     * writes stylized instructions to the console on unzip success
     * @param {string} DIRECTORY the name of the newly created project folder
     */
    writeProjectExecInstructions(DIRECTORY) {
        const header = chalk.green.bold("Here are some useful commands. You can find them later in the 'spin.commands.md' file.");
        const body = `
- Enter your project directory                                                          ${chalk.red.bold(`cd ${DIRECTORY}`)}
- Start a development server for your new React app                                     ${chalk.red.bold("npm start")}
- Create an optimized build of your React app for production environments               ${chalk.red.bold("npm run build")}
- Run interactive tests for your React app 
    (requires a configured ${chalk.white("test")} command: see the 
    package.json file)                                                                  ${chalk.red.bold("npm test")}
`;
        log(header);
        log(body);
    }
}

const ui = new UI();

module.exports = {
    drawWelcomeScreen: ui.drawWelcomeScreen,
    drawLoadingScreen: ui.drawLoadingScreen,
    writeToConsole: ui.writeToConsole,
    writeProjectExecInstructions: ui.writeProjectExecInstructions
};