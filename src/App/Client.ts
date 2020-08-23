import { Client as DiscordClient, ClientOptions, Collection } from 'discord.js'
import { Moment } from 'moment'
import Command from './Command'
import Config from '../config.json'
import Constant from './Module/Constant'
import { Helper } from '../@Types/Helper'

export default class Client extends DiscordClient {
  public command = new Collection<string, Command>()
  public alias = new Collection<string, string>()
  public cooldown = new Collection<string, Moment>()
  public constant = new Constant()
  public help = new Collection<string, Helper>()
  public config = Config
  
  constructor(opt: ClientOptions) { super(opt) }
}
