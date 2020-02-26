/**
 * @author Bastien SANDER <bastien@heyliot.com>
 */
import process from "process";

export const parseArgv = (): {config: null|string} => {
    const args = process.argv.filter((arg) => arg.indexOf('=') !== -1);

    const params = {
        config: null
    };

    const regex = /--(.*)=(.*)/;

    args.forEach((optStr) => {
        const opt = regex.exec(optStr);
        params[opt[1]] = opt[2];
    });

    return params;
};