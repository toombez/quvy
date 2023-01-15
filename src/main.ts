import PettyClient from './models/PettyClient'
import dotenv from 'dotenv'
import CommandsCollection from './models/CommandsCollection'

dotenv.config()

const client = new PettyClient({
    intents: [
        'Guilds',
        'MessageContent',
        'GuildMembers',
        'GuildMessages',
    ]
})

const commandsCollection = new CommandsCollection()

client.on('ready', async (_client) => {
    console.log(`${_client.user.username} ready`)
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return

    const command = commandsCollection.get(interaction.commandName)
    command?.execute(interaction)
})

client.login(process.env.token)
