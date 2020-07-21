import Client from '../Client'
import Events from '../Events'

export default class Debug extends Events {
  constructor() {
    super('debug')
  }

  public run(_client: Client, message: string): void {
    if (process.env.PRODUCTION === 'DEV') {
      console.log(message)
    }
  }
}