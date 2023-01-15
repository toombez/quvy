import { Client, ClientOptions, Collection, flatten, SlashCommandBuilder } from "discord.js";
import { ICommand } from "types"
import { isCommand } from "../utils"

import fs from 'fs'
import path from 'path'

export default class PettyClient extends Client {
    private static COMMANDS_DIR: string = path.join(__dirname, '..', 'commands')

    /**
     * Client commands collection with `command name` and `command object`
     */
    public commands: Collection<string, ICommand> = new Collection();

    constructor(options: ClientOptions) {
        super(options)

        this._commands.then(commands => {
            commands.forEach(this.addCommand.bind(this))
        })
    }

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

    /**
     * Add command to client
     *
     * @param command client command
     */
    private addCommand(command: ICommand) {
        this.commands.set(command.data.name, command)
    }
}
