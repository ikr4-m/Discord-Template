import Client from '../Client'
import Events from '../Events'

export default class Ready extends Events {
  constructor() {
    super('ready')
  }

  public async run(client: Client): Promise<any> {
    console.log('Gateway opened!')

    if (process.env.PRODUCTION === 'DEV') {
      console.log(client.command)
    }
  }
}