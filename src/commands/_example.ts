import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "types";

export default {
    data: new SlashCommandBuilder()
        .setName('example')
        .setDescription('Example command'),
    execute(interaction) {
        interaction.reply('Example')
    },
} as ICommand
