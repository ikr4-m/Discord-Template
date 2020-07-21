import FS from 'fs'
import Path from 'path'
import Client from '../App/Client'
import Events from '../App/Events'

export default (client: Client): void => {
  FS.readdir(Path.join(__dirname, '../App/Events'), (err, events) => {
    if (err) throw err

    events.forEach(async event => {
      const extName = event.split('.').pop()
      if (extName !== 'js') return

      const _evt = await import(Path.join(__dirname, `../App/Events/${event}`))
      const evt = new _evt.default() as Events

      client.on(evt.events as any, (...args: any) => {
        evt.run(client, ...args)
      })
    })
  })
}