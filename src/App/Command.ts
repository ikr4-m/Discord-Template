import { CommandOptions } from '../@Types/Command'
import { Message } from 'discord.js'
import Client from './Client'

export default class Command {
  public options: CommandOptions
  constructor(opt: CommandOptions) {
    this.options = opt
  }

  public async run(_client: Client, _message: Message, _args: string[]): Promise<any> {
    throw new Error('Not implemented')
  }
}
