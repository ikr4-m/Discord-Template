import { Client, Message, CommandComponent, TextChannel } from '@type/Bot';

export default class GlobalOwnerSpeak implements CommandComponent {
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
    let atc = message.attachments;
    let attachment: string[] = [];

    atc.forEach(val => {
      attachment.push(val.url);
    })

    if (!channelID) {
      if (!text || !attachment) {
        return message.reply(client.constant.usage(client.prefix, this.help.usage));
      }
    }

    let channel: TextChannel =
      channelID === 'this' ? message.channel : <any>client.channels.get(channelID);

    channel.send(text, { files: attachment })
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
  }
}
