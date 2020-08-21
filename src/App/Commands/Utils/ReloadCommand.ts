import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'

export default class Ping extends Command {
  constructor() {
    super({
      name: 'reload',
      description: 'Reload command',
      args: [
        { name: 'command', type: 'BLOCK', require: true }
      ],
      example: 'reload ping',
      ownerOnly: true
    })
  }

  public async run(_client: Client, message: Message, _args: string[]): Promise<any> {
    message.channel.send('it works!')
  }
}
