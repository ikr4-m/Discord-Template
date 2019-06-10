import { Client, Message, RichEmbed } from '../extend';

export default class AvatarUser {
  help = {
    name: 'avatar',
    description: 'Get your avatar/your friend avatar.',
    usage: 'avatar [mention|ID]'
  }

  config = {
    aliases: ['ava'],
    cooldown: 5,
    direct_message: false
  }

  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {string[]} args 
   */
  run(client, message, args) {
    let userMention = message.mentions.users.first(),
      userID = args[0],
      mode = '',
      sendedMessage = '',
      embed = new RichEmbed();

    // If user mention and userID not found, get the author avatar
    if (!userMention) {
      if (!userID) {
        mode = 'solo'
      }
      else {
        mode = 'id'
      }
    }
    else {
      mode = 'mention'
    }

    embed
      .setFooter(`Requested from ${message.author.tag}`, message.author.displayAvatarURL)
      .setTimestamp()
      .setColor(client.color)

    // Switcher segment
    switch (mode) {
      // If author avatar
      case 'solo':
        embed.setImage(message.author.displayAvatarURL);
        sendedMessage = 'Your avatar:';
        break;
      // If user mention avatar
      case 'mention':
        embed.setImage(userMention.displayAvatarURL);
        sendedMessage = `${userMention.tag} avatar:`;
        break;
      // If with ID
      // I'm using return statement because this segment is very vulnerable to empty data
      case 'id':
        let realUser = message.channel.members.get(userID);

        if (!realUser)
          return message.reply(client.constant.usage(client.prefix, this.help.usage))

        embed.setImage(realUser.user.displayAvatarURL);
        sendedMessage = `${realUser.user.tag} avatar:`;
        break;
    }

    message.channel.send(sendedMessage, {
      embed: embed
    })
  }
}