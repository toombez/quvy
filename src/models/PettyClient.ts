import { Client, Collection } from "discord.js";
import { ICommand } from "types";

export default class PettyClient extends Client {
    public commands: Collection<string, ICommand> = new Collection()
}
