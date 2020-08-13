import { Message } from 'discord.js'
import Client from '../Client'
import Events from '../Events'

export default class Debug extends Events {
  constructor() {
    super('message')
  }

  public run(client: Client, message: Message): void {
    if (message.author.bot) return
    if (!message.content.startsWith(client.config.botPrefix)) return
  }
}