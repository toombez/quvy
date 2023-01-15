import { Collection } from "discord.js";
import { ICommand } from "types";
import { isCommand } from "../utils";
import path from 'path'
import fs from 'fs'

export default class CommandsCollection extends Collection<string, ICommand> {
    /**
     * Public is loaded commands
     */
    public get isLoaded() {
        return this._isLoaded
    }

    /**
     * Is loaded flag
     */
    private _isLoaded: boolean = false;

    constructor(
        /**
         * Path to directory with commands
         */
        private readonly commandsPath: string = path.join(__dirname, '..', 'commands')
    ) {
        super()

        this.loadCommands().then(commands => {
            commands.forEach(command => {
                this.set(command.data.name, command)
            })

            this._isLoaded = true
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
    private loadCommands(): Promise<ICommand[]> {
        return Promise.all(this.commandsFiles.map(async file => {
            const command = (await import(path.join(this.commandsPath, file))).default

            if (!isCommand(command)) {
                throw new Error(`${file} not implements command interface`)
            }

            return command
        }))
    }

    /**
     * Wait commands loaded
     *
     * @returns commands loaded
     *
     * TODO(code style): fix nested level
     */
    public waitLoaded() {
        const REFRESH_INTERVAL_MS = 100

        return new Promise((res) => {
            const interval = setInterval(() => {
                if (!this._isLoaded) return

                clearInterval(interval)
                res(true)
            }, REFRESH_INTERVAL_MS)
        })
    }
}
