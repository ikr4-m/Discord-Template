import FS from 'fs'
import Path from 'path'
import Client from '../App/Client'
import Command from '../App/Command'

export default (client: Client): void => {
  FS.readdir(Path.join(__dirname, '../App/Commands'), (err, categories) => {
    if (err) throw err
    categories.forEach(category => {
      FS.readdir(Path.join(__dirname, `../App/Commands/${category}`), (err, commands) => {
        if (err) throw err
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
        })
      })
    })
  })
}