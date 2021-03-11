#!/usr/bin/env node

const {exit}=require("yargs");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const spinConfig = require("./config/index");

const Engine = require("./utils/engine/index");
const Spinner = require("./utils/logic/spinner");
const { writeToConsole } = require("./utils/ui/index");

const options = yargs
                    .usage("$0 new")
                    .example("spin_react new", spinConfig.exampleText)
                    .option("b", {
                        alias: "bare-bones",
                        describe: "A new project with pre-configured directory structure and node_modules setup, Axios, React Router DOM and example routes. Great for most kinds of applications.",
                        type: "string",
                        default: true,
                        demandOption: false
                    })
                    .option("blank", {
                        alias: "blank",
                        describe: "A blank canvas with minimal directory structure and node_modules setup. Perfect balance of pre-configuration and flexibility.",
                        type: "string",
                        default: true,
                        demandOption: false
                    })
                    .option("barebones", {
                        alias: "bare-bones",
                        describe: "A blank canvas with minimal directory structure and node_modules setup. Perfect balance of pre-configuration and flexibility. Great for everyone.",
                        type: "string",
                        default: true,
                        demandOption: false
                    })
                    .describe("help", spinConfig.helpText)
                    // .help(description=spinConfig.helpText)
                    .describe("version", spinConfig.versionText)
                    .epilog(spinConfig.epilogText)
                    .parse()
                    .argv;



const args = argv;

if (args._.length > 0) {
    if (args._[0].trim() == 'new') {
        // use the templating menu
        Spinner.createApplication();
    
        return;
    }
}

let template, templates = ['b', 'barebones', 'blank'], count = 0;

if (Object.keys(args).length == 2) {
    if (args._.length == 0) console.log("No params given. Enter 'spin_react new' to create a new project");
    else
        Engine.__BareBones(args._[0]);
} else {
    Object.keys(args).forEach(arg => {
        if (arg == 'help' || arg == 'h') {
            writeToConsole(spinConfig.helpText, "help");
            exit(0);
        }
        if (templates.includes(arg)) {
            count++;
            template = arg;
        }
    });

    if (count > 1) {
        // because only one template may be passed
        console.log("Error! Only one template argument may be passed! Enter `spin_react -h` to see all available options.");
        return 1;
    } else {
        switch (template) {
            case 'b':
                Engine.__BareBones(args.b);
                break;
            case 'barebones':
                Engine.__BareBones(args.barebones);
                break;
            case 'blank':
                Engine.__Blank(args.blank);
                break;
            case 'h':
                writeToConsole(spinConfig.helpText, "failure");
                break;
        
            default:
                writeToConsole(`Invalid template option! Enter spin_react -h for more information.`, "failure");
                break;
        }
        return 0;
    }
}


String.prototype.trim = function(str) {
    const regex = /^\s+|\s+$/g;
    return str.replace(regex, '');
}