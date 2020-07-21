import Client from '../Client'
import Events from '../Events'

export default class Ready extends Events {
  constructor() {
    super('ready')
  }

  public run(_client: Client): void {
    console.log('Gateway opened!')
  }
}