/**
 * Discord-Template
 * (C) 2019 - All rights reserved.
 *
 * Defenition of this Bot.
 * All you can see is the core of the bot.
 */

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

  constructor(opt?: ClientOptions) { super(opt); };

  public commands: Collection<string, CommandComponent> = new Collection();
  public aliases: Collection<string, string> = new Collection();
  public helps: Collection<string, ModuleCommand> = new Collection();
  public temp: TemporaryCollection = new TemporaryCollection();

  public readonly constant: Constant = new Constant();

  public readonly color: string = config['embed_color'];
  public readonly log: object = log;
  public readonly prefix: string = process.env.DEV ? config.bot_dev_prefix : config.bot_prefix;
  public readonly config: GlobalConfiguration = config;

}

export { ExtendedClient as Client }