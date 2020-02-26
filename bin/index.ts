/**
 * @author Bastien SANDER <bastien@heyliot.com>
 */
import colors from "colors";
import {parseArgv} from "./utils/parseArgv";
import readConfigs from "./utils/readConfigs";
import RequestBatcher from "./RequestBatcher";

(async function() {
    const eventualConfigFile = parseArgv().config;
    const configs = await readConfigs(eventualConfigFile);

    if (Object.entries(configs).length === 0)
        return console.error(colors.red("No Configuration found !"));

    // For each config, we get the request json files and we try to execute those asked requests
    Object.entries(configs).forEach(([key, val]) => {
        const rb = new RequestBatcher(key, val);
        rb.executeBatch();
    });
})();
