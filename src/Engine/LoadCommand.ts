import FS from 'fs'
import Path from 'path'
import Client from '../App/Client'
import Command from '../App/Command'
import { Module } from '../@Types/Helper'

export default (client: Client): void => {
  FS.readdir(Path.join(__dirname, '../App/Commands'), (err, categories) => {
    if (err) throw err
    categories.forEach(category => {
      FS.readdir(Path.join(__dirname, `../App/Commands/${category}`), async (err, commands) => {
        if (err) throw err

        client.help.set(category, {
          location: category,
          command: [],
          module: {
            name: '',
            hidden: false
          }
        })
        FS.readFile(`./src/App/Commands/${category}/module.json`, (err, data) => {
          if (err) throw err
          client.help.get(category).module = JSON.parse(data.toString()) as Module
        })

        commands.forEach(async command => {
          const extName = command.split('.').pop()
          if (extName !== 'js') return

          const _cmd = await import(Path.join(__dirname, `../App/Commands/${category}/${command}`))
          const cmd = new _cmd.default() as Command
          
          const commandName = typeof cmd.options.name !== 'string' ? cmd.options.name[0] : cmd.options.name
          client.command.set(commandName, cmd)

          const aliases = typeof cmd.options.name !== 'string' ? cmd.options.name.slice(1) : []
          if (aliases.length > 0) {
            aliases.forEach(alias => {
              client.alias.set(alias, commandName)
            })
          }

          const help = client.help.get(category)
          if (help) {
            help.command.push(`${command.split('.').slice(0, -1).join('.')}:${commandName}`)
          }
        })
      })
    })
  })
}