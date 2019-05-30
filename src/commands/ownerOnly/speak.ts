import { Client, Message, CommandComponent } from '@type/Bot';

export default class Ping implements CommandComponent {
  help = {
    name: 'speak',
    description: 'Speak as the bot',
    usage: 'speak <channelID|this> <text>'
  }

  config = {
    aliases: [],
    cooldown: 1,
    direct_message: true
  }

  async run(client: Client, message: Message, args: string[]) {
    // ONLY OWNER CAN DO THIS MOTHERFUCKER
    if (!client.config.owners_id.includes(message.author.id)) return;

  }
}
