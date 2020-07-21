import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'

export default class Ping extends Command {
  constructor() {
    super({
      name: ['ping', 'p'],
      description: 'Ping'
    })
  }

  public async run(_client: Client, message: Message, _args: string[]): Promise<any> {
    const now = Date.now()
    message.channel.send(':ping_pong: Wait for it...')
      .then(async message => {
        if (!message) return
        const diff = `${(Date.now() - now).toString()} ms`
        await message.edit(`:ping_pong: Pong! (Latency: ${diff})`)
      })
  }
}
