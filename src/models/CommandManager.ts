import { Guild } from "discord.js"
import { ICommand } from "types"
import PettyClient from "./PettyClient"

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
        if (!this.client.application?.commands) return

        const guildId = (typeof guild === 'string') ? guild : guild?.id
        await this.client.application.commands.create(command.data, guildId)

        return
    }
}
