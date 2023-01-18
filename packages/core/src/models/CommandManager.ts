import {
    ApplicationCommandManager,
    Guild,
    GuildApplicationCommandManager
} from "discord.js"
import { ICommand } from "@types"
import CommandsCollection from "./CommandsCollection"
import PettyClient from "./QuviClient"

type DiscordCommandsCollection = GuildApplicationCommandManager | ApplicationCommandManager

export default class CommandManager {
    constructor(
        public readonly client: PettyClient,
    ) {}

    /**
     * Register collection in application or guild
     *
     * @param collection commands collection
     * @param guild guild where register collection
     */
    public async registerCommandsCollection(collection: CommandsCollection, guild?: Guild) {
        await collection.waitLoaded()

        collection.forEach(command => {
            this.registerCommand(command, guild)
        })
    }

    /**
     * Delete all commands in application and guilds
     */
    public async deleteAllCommands() {
        await this.client.application?.commands.fetch()
        this.client.application?.commands.cache.forEach(command => {
            command.delete()
        })

        await this.client.guilds.fetch()
        this.client.guilds.cache.forEach(async guild => {
            await guild.commands.fetch()
            guild.commands.cache.forEach(command => command.delete())
        })
    }

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
        const collection = guild?.commands || this.client.application?.commands
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
    private async findCommand(command: ICommand, collection: DiscordCommandsCollection) {
        await collection.fetch({})
        return collection.cache.find(c => c.name === command.data.name)
    }
}
