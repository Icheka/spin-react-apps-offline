#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const spinConfig = require("./config/index");

const Engine = require("./utils/engine/index");

const options = yargs
                    .usage("$0 -n <project_name>")
                    .example("spin_react my_cool_react_app", spinConfig.exampleText)
                    // .option("n", {
                    //     alias: "name",
                    //     describe: "A name for your new project",
                    //     type: "string",
                    //     demandOption: "A name is required for your project"
                    // })
                    .option("b", {
                        alias: "bare-bones",
                        describe: "A blank canvas with minimal directory structure and node_modules setup. Perfect balance of pre-configuration and flexibility. Great for everyone.",
                        type: "boolean",
                        default: true,
                        demandOption: false
                    })
                    .describe("help", spinConfig.helpText)
                    .describe("version", spinConfig.versionText)
                    .epilog(spinConfig.epilogText)
                    .argv;

const args = argv;
let template, templates = ['b'], count = 0;

if (Object.keys(args).length == 2) {
    Engine.__BareBones(args._[0]);
} else {
    Object.keys(args).forEach(arg => {
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
                Engine.__BareBones(args._);
                
                break;
        
            default:
                break;
        }
        return 0;
    }
}
