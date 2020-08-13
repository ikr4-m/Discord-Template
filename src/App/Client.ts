import { Client as DiscordClient, ClientOptions, Collection } from 'discord.js'
import { Moment } from 'moment'
import Command from './Command'
import Config from '../config.json'

export default class Client extends DiscordClient {
  public command = new Collection<string, Command>()
  public alias = new Collection<string, string>()
  public cooldown = new Collection<string, Moment>()
  public config = Config
  
  constructor(opt: ClientOptions) { super(opt) }
}
