import { Client, Collection, Message } from 'discord.js';
import * as config from './config.json';
import log from './console';

/**
 * Extender Client for Tempeh.
 */
class ExtendedClient extends Client {

  public commands: Collection<any, any>;
  public helps: Collection<any, any>;
  public aliases: Collection<any, any>;

  protected color: string;
  public log: object;
  protected prefix: string;

  constructor(opt: import('discord.js').ClientOptions | undefined) {
    super(opt);
    this.commands = new Collection();
    this.helps = new Collection();
    this.aliases = new Collection();

    this.color = config.embed_color;
    this.log = log;
    this.prefix = config.bot_prefix;
  }
}

export { ExtendedClient as Client }