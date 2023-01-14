import { Collection } from 'discord.js'
import PettyClient from './models/PettyClient'
import dotenv from 'dotenv'
import { ICommand } from 'types'

dotenv.config()

const client = new PettyClient({
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

client.login(process.env.token)
