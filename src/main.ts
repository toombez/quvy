import { Client, Collection } from 'discord.js'
import dotenv from 'dotenv'
import fs from 'fs'
import { ICommand } from 'types'

dotenv.config()
const token = process.env.token

const commands = new Collection<string, ICommand['execute']>()

const client = new Client({
    intents: [
        'Guilds',
        'MessageContent',
        'GuildMembers',
        'GuildMessages',
    ]
})

client.on('ready', (client) => {
    console.log(`${client.user.username} ready`)
})

client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) {
        return
    }

    const commandHandler = commands.get(interaction.commandName)
    if (commandHandler) {
        commandHandler(interaction)
    }
});

(async () => {
    await Promise.all(fs.readdirSync('src/commands')
        .filter(file => file.endsWith('ts'))
        .map(async (file) => {
            const command: ICommand = (await require(`./commands/${file}`)).default
            commands.set(command.data.name, command.execute)
        }))

    client.login(token)
})()
