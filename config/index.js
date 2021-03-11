const helpText = require("./helpText");

const config = {
    exampleText: "Spins a new React project with project template configuration",
    helpText,
    versionText: "Show version information",
    epilogText: "Spin-React-App-Offline, made with love:>> Icheka Ozuru (2021)",
    TEMPLATES: {
        0: "Blank (--blank): A blank React application, similar to what you would get by running create-react-app",
        1: "Barebones (--barebones/-b): A blank React application with Axios and React-Router-DOM installed and pre-configured directories. Perfect for getting you started on most kinds of applications."
    }
};

module.exports = config;