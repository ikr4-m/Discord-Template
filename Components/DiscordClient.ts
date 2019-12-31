import { Client, Collection } from 'discord.js'
import { CommandList } from '@ty/Client'
import Console from './Console'
import Config from '../config.json'
import strFormat from 'string-format'

export * from 'discord.js'
export class DiscordClient extends Client {
  public config = Config
  public console = Console

  public commands: Collection<string, CommandList> = new Collection()
  public aliases: Collection<string, string> = new Collection()
  public helps: Collection<string, string[]> = new Collection()
  public uptimeDate: Date = new Date()

  public usage (denial: string) {
    const usage = this.commands.filter(c => c.denial === denial).first().usage
    return strFormat(`cara penggunaan yang benar adalah:\n\`\`\`${usage}\`\`\``, {
      prefix: this.config.bot_prefix
    })
  }
}
