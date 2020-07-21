import { Client as BaseClient, ClientOptions, Collection } from 'discord.js'
import { Moment } from 'moment'
import Command from './Command'

export default class Client extends BaseClient {
  public command = new Collection<string, Command>()
  public alias = new Collection<string, string>()
  public cooldown = new Collection<string, Moment>()
  
  constructor(opt: ClientOptions) { super(opt) }
}
