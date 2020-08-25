import { Message } from 'discord.js'
import Command from '../../Command'
import Client from '../../Client'
import Util from 'util'

export default class Ping extends Command {
  constructor() {
    super({
      name: 'eval',
      description: 'Evaluate code',
      args: [
        { name: 'code', type: 'BLOCK', require: true }
      ],
      example: 'reload <blockJSCode>',
      ownerOnly: true
    })
  }

  public async run(client: Client, message: Message, args: string[]): Promise<any> {
    const code = args.join(' ')
    if (!code) return client.constant.usage(message, this.options.name, this.options.args)

    try {
      let ev = eval(code)
      console.log (ev)

      if (typeof ev !== 'string') {
        ev = Util.inspect(ev, { depth: 0 })
      }

      message.channel.send(`\`\`\`${ev}\`\`\``)
    } catch (error) {
      console.error(error)
      message.channel.send(error.message)
    }
  }
}
