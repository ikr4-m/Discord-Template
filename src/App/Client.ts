import { Client as BaseClient, ClientOptions, Collection } from 'discord.js'
import Command from './Command'

export default class Client extends BaseClient {
  public command = new Collection<string, Command>()
  public alias = new Collection<string, string>()
  
  constructor(opt: ClientOptions) { super(opt) }
}
