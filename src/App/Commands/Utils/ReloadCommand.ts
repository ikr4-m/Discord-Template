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

  public async run(client: Client, message: Message, args: string[]): Promise<any> {
    if (!args.length) return client.constant.usage(message, this.options.name, this.options.args)

    let commandFile = ''
    const cmd = args[0].toLowerCase()
    const command = client.command.get(cmd)
    const help = client.help.find(hel => {
      let ret = false
      hel.command.forEach(com => {
        const realCom = com.split(':')
        if (realCom[1] === cmd) {
          commandFile = realCom[0]
          ret = true
        }
      })
      return ret
    })

    if (!command || !help) return message.reply('no command found. Please try again.')

    try {
      const location = `../${help.location}/${commandFile}.js`
      delete require.cache[require.resolve(location)]

      const _newCommand = await import(location)
      const newCommand = new _newCommand.default() as Command

      client.command.set(cmd, newCommand)
      await message.reply(`command **"${cmd}"** successfully reloaded!`)
    } catch (error) {
      console.error(error)
      message.reply(`there was something wrong when reloading "${cmd}" command.\n\`\`\`${error.message}\`\`\``)
    }
  }
}
