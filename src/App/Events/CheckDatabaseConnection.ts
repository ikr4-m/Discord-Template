import { Message } from 'discord.js'
import Client from '../Client'
import Events from '../Events'
import { checkConnection } from '../Models/_Connection'

export default class Debug extends Events {
  constructor() {
    super('ready')
  }

  public async run(_client: Client, _message: Message): Promise<any> {
    checkConnection()
      .then(() => console.log('Handshaking with SQLite successfully!'))
      .catch(err => { throw err })
  }
}