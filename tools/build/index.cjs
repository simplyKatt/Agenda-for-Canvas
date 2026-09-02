// SPDX-License-Identifier: MPL-2.0

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const args = process.argv.slice(2);
console.log("Total Args",args);
const platformArg = args[0];
const buildOptions = args.slice(1);

function handleArguments() {
    const all_args = args;
    const plat_args = platformArg;
    const build_args = buildOptions;
    console.log("Build_args", build_args);

    if (plat_args == "help" || plat_args == "--help" || plat_args == "h" || plat_args == "-h") {
        console.log("Agenda for Canvas - Build Tools Help")
        console.log("========================================================================")
        console.log("Description                | Command")
        console.log("General Help Command       | npm run build help") //ToDo: Add specific help pages like npm run build help buildoptions
        console.log("Build Tool Version Command | npm run build version")
        console.log("Build Command              | npm run build [FireFox/FF|Chrome/CH|All|None] [Build Options]");
        process.exit(0);
    };

    if (plat_args == "version" || plat_args == "--version" || plat_args == "v" || plat_args == "-v") {
        let build_utils_version = require('../../package.json').version;
        console.log("Agenda for Canvas - Build Tool Versions")
        console.log("========================================================================");
        console.log("Description                         | Data");
        console.log("------------------------------------|----------------------");
        console.log("The version of the software tool    | Tool Version",build_utils_version);
        console.log("The version of the Operating System | OS Version",os.version());
        process.exit(0);
    };

    let Target_Platform
    const platargs_safe = plat_args.toLowerCase();
    switch(platargs_safe) {
        case "ff":
        case "firefox":
            Target_Platform = "FF"
            break;
        case "ch":
        case "chrome":
            Target_Platform = "CH"
            break;
        case "all":
        case "both":
        case "ff/ch":
        case "ch/ff":
            Target_Platform = "AL"
            break;
        case "none":
        case "false":
        case "no":
            Target_Platform = "NO"
            break;
        default:
            Target_Platform = "ER"
            break;
    };
    
    // Need to take BuildOptions[n] -> BuildOptions_String and then split/sort based on the words "include=" and "exclude=".
    buildOptions_Split=build_args.toString().split(","); //Don't put "," in a dir name unless you want to break something.
    console.log(buildOptions_Split);
    let include_pos, exclude_pos, data_pos;
    let include_dat, exclude_dat, data_content;
    let len = buildOptions_Split.length;
    console.log("Split BO:",buildOptions_Split);
    for (let i = 0; i < len; i++) {
        var search_content = buildOptions_Split[i];
        if (!search_content.includes("include")) include_pos = null;
        else {
            include_pos = search_content.indexOf("include")
            if (search_content.indexOf('include', include_pos + 1) !== -1) {
                include_pos = null;
                throw new Error("[Btools|ArgsParse]: One or more duplicate include arguments were found when parsing arguments.")
            }
        };
        if (!search_content.includes("exclude")) exclude_pos = null;
        else {
            exclude_pos = search_content.indexOf("exclude")
            if (search_content.indexOf('exclude', exclude_pos + 1) !== -1) {
                exclude_pos = null;
                throw new Error("[Btools|ArgsParse]: One or more duplicate exclude arguments were found when parsing arguments.")
            }
        };
        if (!search_content.includes("data")) data_pos = null;
        else {
            data_pos = search_content.indexOf("data")
            if (search_content.indexOf('data', data_pos + 1) !== -1) {
                data_pos = null;
                throw new Error("[Btools|ArgsParse]: One or more duplicate data arguments were found when parsing arguments.")
            }
        };
    }
    if (include_pos != null) {
        //
        
    }
    if (exclude_pos != null) {
        //

    }
    if (data_pos != null) {
        //

    }


    return {
        "Target_Platform":Target_Platform,
        //Pass on a safe array to prevent idioitism.
    };
};

handleArguments();

// EVERYTHING BELOW THIS POINT IS AI-GENERATED AS A REFERENCE AND WILL BE REMOVED. (Template Code)

/*
const sourceBase = path.resolve(path.join(__dirname, '..'));
const distBase = path.join(sourceBase, 'dist');

const excluded = buildOptions
    .filter(opt => opt.startsWith('!include='))
    .map(opt => opt.substring('!include='.length));

function copyDir(src, dest) {
    if (!fs.existsSync(src)) {
        console.warn(`Warning: Source directory not found: ${src}`);
        return;
    }
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        
        if (excluded.some(ex => ex === `/${file}` || ex === `/${path.basename(src)}/${file}`)) {
            console.log(`Excluding: ${srcPath}`);
            continue;
        }

        if (fs.statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function build(platform) {
    console.log(`\nBuilding for ${platform}...`);
    const platformDir = platform === 'firefox' ? 'FF' : 'CH';
    const outDir = path.join(distBase, platform);

    if (fs.existsSync(outDir)) {
        console.log(`Cleaning old build directory: ${outDir}`);
        fs.rmSync(outDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outDir, { recursive: true });

    // Copy /common contents, then /_locales, and /icons
    copyDir(path.join(sourceBase, 'common'), outDir);
    copyDir(path.join(sourceBase, '_locales'), path.join(outDir, '_locales'));
    copyDir(path.join(sourceBase, 'icons'), path.join(outDir, 'icons'));
    
    // Copy platform-specific files, overwriting common ones if they exist
    copyDir(path.join(sourceBase, platformDir), outDir);

    console.log(`Build for ${platform} completed successfully!`);
}

function main() {
    if (!platformArg || platformArg === 'none') {
        console.log("No platform specified or 'none' selected. Exiting build process.");
        return;
    }

    const platforms = [];
    if (platformArg === 'all') {
        platforms.push('firefox', 'chrome');
    } else if (platformArg === 'ff' || platformArg === 'firefox') {
        platforms.push('firefox');
    } else if (platformArg === 'ch' || platformArg === 'chrome') {
        platforms.push('chrome');
    } else {
        console.error(`Error: Unknown platform '${platformArg}'.`);
        console.log("Usage: npm run build [firefox/ff|chrome/ch|all|none] [options]");
        process.exit(1);
    }

    if (!fs.existsSync(distBase)) {
        fs.mkdirSync(distBase, { recursive: true });
    }

    for (const p of platforms) {
        build(p);
    }
}

main();
*/