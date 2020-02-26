/**
 * @author Bastien SANDER <bastien@heyliot.com>
 */
import fs from "fs";
import colors from "colors";
import {CONFIG_FOLDER_PATH} from "./constants";

const readConfigs = async (configFileName: string|null) => {
    const configs = {};
    // If no FileName we get all the JSON config files
    const fileNameFilter = (configFileName) ? (fileName) => fileName === configFileName
                                             : (fileName) => fileName.endsWith(".json");
    try {
        // get JSON files from the configs folder
        const configsFiles = fs
            .readdirSync(`${__dirname}/${CONFIG_FOLDER_PATH}`)
            .filter(fileNameFilter);

        // construct an object with the fileName as Key and its JSON content as value
        for (let i = 0; i < configsFiles.length; i++) {
            const fileName = configsFiles[i].split(".").slice(0, -1).join(".");
            configs[fileName] = (await import(`${CONFIG_FOLDER_PATH}/${configsFiles[i]}`)).default;
        }
    } catch (e) {
        console.log(colors.red("An error as occured while trying to get Config Files: \r\n\r\n"), e);
    }

    return configs;
};

export default readConfigs;
