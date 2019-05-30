import { Client, Collection } from 'discord.js';
import { CommandComponent, GlobalConfiguration } from '@type/Bot';
import * as config from './config.json';
import log from './console';

/**
 * Extender Client for Tempeh.
 */
class ExtendedClient extends Client {

  public commands: Collection<string, CommandComponent>;
  public aliases: Collection<string, string>;
  public helps: Collection<string, {}>;

  public color: string;
  public log: object;
  public prefix: string;
  public config: GlobalConfiguration;

  constructor(opt: import('discord.js').ClientOptions | undefined) {
    super(opt);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.helps = new Collection();

    this.color = config.embed_color;
    this.log = log;
    this.prefix = process.env.DEV ? config.bot_dev_prefix : config.bot_prefix;
    this.config = config;
  }
}

export { ExtendedClient as Client }