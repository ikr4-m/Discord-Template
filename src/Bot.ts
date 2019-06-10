import { Client, Collection, ClientOptions } from 'discord.js';
import { CommandComponent, GlobalConfiguration, ModuleCommand } from '@type/Bot';
import * as config from './config.json';
import log from './console';
import Constant from './assets/ts/constant';
import TemporaryCollection from './assets/ts/temporary';

/**
 * Extender Client for Tempeh.
 */
class ExtendedClient extends Client {

  public commands: Collection<string, CommandComponent>;
  public aliases: Collection<string, string>;
  public helps: Collection<string, ModuleCommand>;
  public temp: TemporaryCollection;

  public readonly constant: Constant;

  public readonly color: string;
  public readonly log: object;
  public readonly prefix: string;
  public readonly config: GlobalConfiguration;

  constructor(opt?: ClientOptions) {
    super(opt);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.helps = new Collection();
    this.temp = new TemporaryCollection();

    this.constant = new Constant();

    this.color = config.embed_color;
    this.log = log;
    this.prefix = process.env.DEV ? config.bot_dev_prefix : config.bot_prefix;
    this.config = config;
  }
}

export { ExtendedClient as Client }