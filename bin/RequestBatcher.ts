/**
 * @author Bastien SANDER <bastien@heyliot.com>
 */
import colors from "colors";
import {NB_BATCHES, NB_REQUEST_PER_BATCH} from "./utils/constants";

export default class RequestBatcher {
    private name: string;
    private config: object;

    constructor(name, config) {
        this.name = name;
        this.config = config;

        console.log(config);
    }

    sendRequest = () => {
        return "";
    };


    executeBatch = async () => {
        const batches = Array(NB_BATCHES).fill(Array(NB_REQUEST_PER_BATCH).fill(this.sendRequest));
        for (const batch of batches) {
            try {
                console.log(`-- Batching ${NB_REQUEST_PER_BATCH} requests --`);
                await Promise.all(batch.map(f => f()))
            } catch(err) {
                console.error(colors.red(err))
            }
        }
    };
}
