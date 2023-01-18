import { Client, ClientOptions } from "discord.js"

export default class QuviClient extends Client {
    constructor(
        options: ClientOptions,
    ) {
        super(options)
    }
}
