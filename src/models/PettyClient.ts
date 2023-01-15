import { Client, ClientOptions } from "discord.js";

export default class PettyClient extends Client {
    constructor(options: ClientOptions) {
        super(options)
    }
}
