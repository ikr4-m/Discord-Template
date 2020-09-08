import { Message, MessageEmbed } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import Moment from 'moment'

export default class Ping extends Command {
  constructor() {
    super({
      name: 'help',
      description: 'List of the command in here',
      args: [
        { name: 'command', require: false, type: 'BLOCK' }
      ],
      example: 'help ping'
    })
  }

  public async run(client: Client, message: Message, args: string[]): Promise<any> {
    const command = args[0]
    const cmd = client.command
    const help = client.help

    const embed = new MessageEmbed()
      .setTimestamp()
      .setColor(client.config.botColor)
      .setFooter(
        `(C) ${Moment().format('YYYY')} - ${client.config.botName} | Running ${cmd.size} command${cmd.size > 1 ? 's' : ''}`
      )
      .setThumbnail(client.user.displayAvatarURL())

    // Global help
    if (!command || command.length === 0) {
      embed
        .setTitle(`${client.config.botName} Command List`)
        .setDescription(
          `To check the use of commands on this bot, type in the chat: \n\`\`\`${client.config.botPrefix}help <command>\`\`\`\n` +
          'Please note, for giving arguments:\n' +
          `\`${client.config.botPrefix}com [args]\` **>>** The command argument is not required to be written.\n` +
          `\`${client.config.botPrefix}com <args>\` **>>** The command argumen is required to be written.\n` +
          `\`${client.config.botPrefix}com [menu|m]\` **>>** You can choose an argument between the square brackets.`
        )

      help.forEach(category => {
        if (!category.module.hidden) {
          const cmdList = category.command.map(cate => cate.split(':')[1])
          embed.addField(category.module.name, `\`${cmdList.join('` `')}\``)
        }
      })
    }
    // Strict help
    else {
      const getCmd = cmd.get(command)
      if (!getCmd) return client.constant.usage(
        message, this.options.name, this.options.args
      )

      const args = typeof getCmd.options.name !== 'string'
        ? getCmd.options.name.slice(1)
        : []
      embed
        .setAuthor(`${client.config.botPrefix}${command} command usage.`)
        .addField('Description', getCmd.options.description)
        .addField('Alias', args.length === 0 ? 'No aliases.' : `${client.config.botPrefix}${args.join(`, ${client.config.botPrefix}`)}`)
        .addField('Example', `${client.config.botPrefix}${!getCmd.options.example ? command : getCmd.options.example}`)
    }

    message.channel.send(`<@!${message.author.id}>`, { embed: embed })
  }
}
