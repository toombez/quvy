import { Client } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()
const token = process.env.token

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

client.login(token)
