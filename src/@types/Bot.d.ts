import * as Bot from '../Bot';

// Export all class from DiscordJS without exception as defenition
export * from 'discord.js';

// Override Discord_JS.Client with new Client
export class Client extends Bot.Client { }