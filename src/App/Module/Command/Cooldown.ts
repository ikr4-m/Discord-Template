import Client from '../../Client'
import { Message } from 'discord.js'
import Moment from 'moment'
import Command from '../../Command'

export default (client: Client, message: Message, command: Command) => {
  const commandName = typeof command.options.name !== 'string'
    ? command.options.name[0]
    : command.options.name
  const cooldownCode = `${message.author.id}:${message.guild.id}:${commandName}`
  const now = Moment()
  const cooldownGetter = client.cooldown.get(cooldownCode)
  const cooldown = command.options.cooldown || client.config.cooldownDefault
  const ret = {
    result: false,
    diff: 0
  }

  if (!cooldownGetter) {
    client.cooldown.set(cooldownCode, now)
  } else {
    const diff = now.diff(cooldownGetter, 'seconds')
    if (diff > cooldown) {
      client.cooldown.delete(cooldownCode)
      ret.result = false
    } else {
      ret.result = true
      ret.diff = diff
    }
  }

  return ret
}
