import FS from 'fs'
import Path from 'path'
import Client from '../App/Client'

export default (client: Client): void => {
  FS.readdir(Path.join(__dirname, '../App/Events'), (err, events) => {
    if (err) throw err

    events.forEach(async event => {
      const extName = event.split('.').pop()
      if (extName !== 'js') return

      const _evt = await import(Path.join(__dirname, `../App/Events/${event}`))
      const evt = new _evt.default()

      client.on(evt.events, (...args: any) => {
        evt.run(client, ...args)
      })
    })
  })
}