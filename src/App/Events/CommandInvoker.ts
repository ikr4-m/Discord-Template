import { Message } from 'discord.js'
import Client from '../Client'
import Events from '../Events'
import Cooldown from '../Module/Command/Cooldown'

export default class Debug extends Events {
  constructor() {
    super('message')
  }

  public async run(client: Client, message: Message): Promise<any> {
    const content = message.content
    const args = content.split(' ')
    const cmdName = args[0].substring(client.config.botPrefix.length)
    const command = client.command.get(cmdName) || client.command.get(client.alias.get(cmdName))

    // Checker
    if (message.author.bot) return
    if (!message.content.startsWith(client.config.botPrefix)) return
    if (!command) return
    
    const commandName = typeof command.options.name !== 'string'
      ? command.options.name[0]
      : command.options.name

    // Is still cooldown
    const isStillCooldown = Cooldown(client, message, command)
    if (isStillCooldown.result && !client.config.owner.includes(message.author.id)) {
      return message.reply(`please wait until ${isStillCooldown.diff} seconds.`)
    }

    // Is only owner
    if (command.options.ownerOnly && !client.config.owner.includes(message.author.id)) {
      return message.reply('this command for owner only.')
    }

    try {
      command.run(client, message, args)
    } catch (error) {
      console.error(error)
      message.reply('something wrong with server. Try again later.')
    } finally {
      console.log(`<${message.author.id}> executing ${commandName} in <${message.guild.id}> server.`)
    }
  }
}