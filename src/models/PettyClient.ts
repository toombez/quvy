import { Client, Collection } from "discord.js";
import { ICommand } from "types";

export default class PettyClient extends Client {
    /**
     * Client commands files
     *
     * Returns only files `js`/`ts` files that not starts with `_`
     */
    private get commandsFiles() {
        return fs.readdirSync(PettyClient.COMMANDS_DIR)
            .filter(file => file.endsWith('js') || file.endsWith('ts'))
            .filter(file => !file.startsWith('_'))
    }
}
