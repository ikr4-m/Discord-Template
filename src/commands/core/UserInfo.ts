import { Client, Message, CommandComponent, GuildMember } from '@type/Bot';
import { RichEmbed } from 'discord.js';
import Moment from 'moment';

export default class UserInfo implements CommandComponent {
  help = {
    name: 'userinfo',
    description: 'Info of the user.',
    usage: 'userinfo [mention|id]'
  }

  config = {
    aliases: ['info'],
    cooldown: 5,
    direct_message: true
  }

  async run(client: Client, message: Message, args: string[]) {
    let memberBasedID: GuildMember = message.guild.members.get(args[0])!;
    let memberBasedMention: GuildMember = message.mentions.members.first();
    let authorBasedID: GuildMember = message.guild.members.get(message.author.id)!;
    let mode: string = !memberBasedID && !memberBasedMention ? 'author' : 'mention';
    let embed = new RichEmbed()
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL)
      .setTimestamp();

    function setEmbed(member: GuildMember) {
      embed
        .setColor(member.displayColor)
        .setThumbnail(member.user.displayAvatarURL)
        .setTitle(`${member.user.tag} User Info`)

        .addField('User ID', member.id, true)
        .addField('Nickname', member.nickname || member.user.username, true)
        .addField('Status', member.presence.status, true)

      !member.presence.game
        ? embed.addField('Playing Game', 'Not playing', true)
        : embed.addField('Playing Game', member.presence.game.name, true)

      embed
        .addField('Account Created', Moment(member.user.createdAt).format(client.constant.defaultMomentTemplate), false)
        .addField('Join in this server', Moment(member.joinedAt).format(client.constant.defaultMomentTemplate), false)
        .addField(`Roles [${member.roles.size}]`, `\`${member.roles.map(role => role.name).join('` | `')}\``, false)
    }

    // Based author
    if (mode === 'author') {
      // message.channel.send('It works!');
      setEmbed(authorBasedID);
    }
    else {
      // Based mention
      if (!memberBasedID) {
        // message.channel.send('It works! But in Mention.');
        setEmbed(memberBasedMention);
      }
      // Based ID
      else {
        // message.channel.send('It works! But in ID');
        if (!memberBasedID) return message.reply(
          client.constant.usage(client.prefix, this.help.usage)
        )
        setEmbed(memberBasedID);
      }
    }

    message.channel.send(`<@!${message.author.id}>`, { embed: embed });
  }
}
