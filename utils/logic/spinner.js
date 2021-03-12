const chalk = require("chalk");
const yargs = require("yargs");
const prompt = require("prompt");
const cliSelect = require("cli-select");
const ora = require("ora");
const inquirer = require("inquirer");

const { TEMPLATES } = require("../../config/index");

const { hideBin } = require("yargs/helpers");
const {read}=require("fs");
const {RSA_X931_PADDING}=require("constants");
const argv = yargs(hideBin(process.argv)).argv;
const Engine = require("../engine/index");
const { log, clear } = require("console");

class Spinner {

    createApplication() {
        const Questions = [
            {
                shorttag: "Name",
                tag: `Give your project a name: (${__dirname})`,
                default: __dirname
            },
            {
                shorttag: "Version",
                tag: `Version: (1.0.0)`,
                default: "1.0.0"
            },
            {
                shorttag: "Description",
                tag: `Description: (A fine Reacy app spun with Spin React Apps Offline)`,
                default: "A fine React app spun with Spin React Apps Offline"
            },
            {
                shorttag: "Repository",
                tag: `Remote repository: (None)`,
                default: "None"
            },
            {   
                shorttag: "Author",
                tag: `Author: (None)`,
                default: "None"
            },
            {
                shorttag: "License",
                tag: `License: (ISC)`,
                default: "ISC"
            },
            {
                shorttag: "Homepage",
                tag: `Homepage: (None)`,
                default: "None"
            }
        ];
        let questions = [];
        Object.values(Questions).forEach(q => questions.push(q.shorttag));
        
        let Q_A = {};
        prompt.start();
        prompt.get(questions, (err, result) => {
            if (err) log("An error occurred. Try running Spin React Apps Offline again.")
            Object.keys(result).forEach(key => Q_A[key] = result[key]);

            log(chalk.yellowBright(`Choose a template...\n`));
            const spinner = ora("Choose a template...");
            spinner.start();
            // Object.keys(TEMPLATES).forEach(template => log(chalk.yellow(`${template}: ${TEMPLATES[template]}\n`)));
            let templates = [];
            Object.keys(TEMPLATES).forEach(template => templates.push(`${template}: ${TEMPLATES[template]}`));
            // templates = templates.join("\n");
            inquirer.prompt({
                type: "list",
                name: "selectedTemplate",
                message: "",
                choices: templates
            })
                .then(answer => {
                    // return log(answer.selectedTemplate)
                    spinner.stop();
                    switch (templates.indexOf(answer.selectedTemplate)) {
                        case 0:
                            Engine.__Blank(result['Name']);
                            break;
                        case 1:
                            Engine.__BareBones(result['Name']);
                            break;
                        default:
                            log(chalk.yellowBright("The input you entered is invalid"));
                    }
                })
                .catch(err => {
                    if (err.isTtyError) return log(chalk.redBright("The terminal you're using does not support teletyping. Please use `spin_react <project_name> --blank|--barebones` to bootstrap your project with either the blank or the barebones template"));
                    return log(chalk.red(`An error associated with your terminal environment occurred. Please, log `));
                });
        });
    }
}

module.exports = new Spinner();