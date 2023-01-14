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

    /**
     * Client commands
     *
     * Throws error if file in `commands` folder isn't implements command interface
     */
    private get _commands(): Promise<ICommand[]> {
        return Promise.all(this.commandsFiles.map(async file => {
            const command = (await import(path.join(PettyClient.COMMANDS_DIR, file))).default

            if (!isCommand(command)) {
                throw new Error(`${file} not implements command interface`)
            }

            return command
        }))
    }
}
