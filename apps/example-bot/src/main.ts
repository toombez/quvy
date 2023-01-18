import {
    CommandsCollection,
    QuviClient,
} from '@quvy/core'

import dotenv from 'dotenv'

dotenv.config()

const client = new QuviClient({
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
