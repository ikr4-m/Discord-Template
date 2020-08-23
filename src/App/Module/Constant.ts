import { Message } from 'discord.js';
import Config from '../../config.json'
import { CommandArguments } from '../../@Types/Command';
import ArgsToString from './Command/ArgsToString'

export default class Constant {
  public usage (message: Message, name: string | string[], args: CommandArguments[]) {
    const fixedName = typeof name !== 'string' ? name[0] : name
    return message.reply(`the correct usage is:\n\`\`\`${Config.botPrefix}${fixedName} ${ArgsToString(args)}\`\`\``)
  }
}
