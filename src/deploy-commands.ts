import { REST, Routes } from 'discord.js'
import fs from 'node:fs'

import dotenv from 'dotenv'
import { ICommand } from 'types'

dotenv.config()

const {
    DISCORD_TOKEN,
    CLIENT_ID,
    GUILD_ID,
} = process.env as { [key: string]: string  }

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

(async () => {
    Promise.all(fs.readdirSync('./src/commands')
        .filter(file => file.endsWith('.ts'))
        .map(async (file) => {
            const command: ICommand = (await require(`./commands/${file}`)).default
            return command.data.toJSON()
        }))
        .then(async commands => {
            console.log(`Started refreshing ${commands.length} application (/) commands.`)

            await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                { body: commands }
            )

            console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
        })
        .catch(console.error)
})()
