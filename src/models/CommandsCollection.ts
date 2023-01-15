import { Collection } from "discord.js";
import { ICommand } from "types";
import { isCommand } from "../utils";
import path from 'path'
import fs from 'fs'

export default class CommandsCollection extends Collection<string, ICommand> {
    constructor(
        /**
         * Path to directory with commands
         */
        private readonly commandsPath: string = path.join(__dirname, '..', 'commands')
    ) {
        super()

        this._commands.then(commands => {
            commands.forEach(command => {
                this.set(command.data.name, command)
            })
        })
    }

    /**
     * Commands files
     *
     * Returns only files `js`/`ts` files that not starts with `_`
     */
    public get commandsFiles() {
        return fs.readdirSync(this.commandsPath)
            .filter(file => file.endsWith('js') || file.endsWith('ts'))
            .filter(file => !file.startsWith('_'))
    }

    /**
     * Commands
     *
     * Throws error if file in `commands` folder isn't implements command interface
     */
    private get _commands(): Promise<ICommand[]> {
        return Promise.all(this.commandsFiles.map(async file => {
            const command = (await import(path.join(this.commandsPath, file))).default

            if (!isCommand(command)) {
                throw new Error(`${file} not implements command interface`)
            }

            return command
        }))
    }
}
