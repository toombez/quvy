import {
    ApplicationCommandManager,
    Guild,
    GuildApplicationCommandManager
} from "discord.js"
import { ICommand } from "types"
import PettyClient from "./PettyClient"

type CommandsCollection = GuildApplicationCommandManager | ApplicationCommandManager

export default class CommandManager {
    constructor(
        public readonly client: PettyClient
    ) {}

    /**
     * Register command in application or guild
     *
     * @param command target commands to register
     * @param guild guild where register command
     */
    public async registerCommand(command: ICommand, guild?: Guild): Promise<void> {
        if (!this.client.application?.commands) return

        await this.client.application.commands.create(command.data, guild?.id)
    }

    /**
     * Delete command in application or guild
     *
     * @param command target command
     * @param guild guild where delete command
     */
    public async deleteCommand(command: ICommand, guild?: Guild): Promise<void> {
        const collection: CommandsCollection | undefined = guild?.commands
            || this.client.application?.commands
        if (!collection) return

        const _command = await this.findCommand(command, collection)
        if (!_command) return

        _command.delete()
    }

    /**
     * Find command by name in collection
     *
     * @param command command to find
     * @param collection collection where find
     * @returns command
     */
    private async findCommand(command: ICommand, collection: CommandsCollection) {
        await collection.fetch({})
        return collection.cache.find(c => c.name === command.data.name)
    }
}
