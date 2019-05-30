import * as Bot from '../Bot';
import DiscordJS from 'discord.js';

// Export all class from DiscordJS without exception as defenition
export * from 'discord.js';

// Override Discord_JS.Client with new Client
export class Client extends Bot.Client { }

// Command component
export interface CommandComponent {

  run: (client: Bot.Client, message: DiscordJS.Message, args: string[]) => Promise<void>;

  config: {
    aliases: string[];
    cooldown: number;
    direct_message: boolean;
  }

  help: {
    name: string;
    description: string;
    usage: string;
  }
}

export interface ModuleCommand {
  name: string;
  hide: boolean;
  strict: string[] | null;
  cmds: string[];
}
