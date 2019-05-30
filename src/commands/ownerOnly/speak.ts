import { Client, Message, CommandComponent, Channel, TextChannel, DMChannel, GroupDMChannel } from '@type/Bot';

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

    let channelID = args[0];
    let text = args.splice(1).join(' ');

    let channel: TextChannel =
      channelID === 'this' ? message.channel : <any>client.channels.get(channelID);

    channel.send(text)
      .then(() => {
        if (channelID !== 'this') {
          message.channel.send(`Your message was send in <#${channelID}>`);
        }
        else {
          message.delete();
        }
      })
      .catch((e) => {
        message.channel.send(e.message);
      });

    console.log(text)
  }
}
