import { Client, Message, CommandComponent } from '@type/Bot';
import { RichEmbed } from 'discord.js';
import strTemplate from 'string-template';
import Moment from 'moment';

const countTrueFalseMap = (map: any[]): number => {
  let count = 0;
  map.forEach(val => {
    if (val === (true || 'true')) count++;
  });
  return count;
}

export default class ServerInfo implements CommandComponent {
  help = {
    name: 'serverinfo',
    description: 'Info of the server.',
    usage: 'serverinfo'
  }

  config = {
    aliases: ['server'],
    cooldown: 5,
    direct_message: false
  }

  async run(client: Client, message: Message, args: string[]) {
    let embed = new RichEmbed();
    let guild = message.guild;

    embed
      .setColor(guild.owner.displayColor)
      .setTitle(`[${guild.nameAcronym} | ${guild.region}] ${guild.name}`)
      .setThumbnail(guild.iconURL)
      .setTimestamp()
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL);

    // Global server info
    if (!args.includes('roles')) {
      embed
        .addField('Server ID', guild.id, true)
        .addField('Region', guild.region, true)
        .addField(
          `Members[${guild.memberCount}]`,
          strTemplate(
            '{online} online\n{idle} idle\n{dnd} DnD\n{offline} offline',
            {
              online: countTrueFalseMap(guild.members.map(m => m.presence.status === 'online')),
              idle: countTrueFalseMap(guild.members.map(m => m.presence.status === 'idle')),
              dnd: countTrueFalseMap(guild.members.map(m => m.presence.status === 'dnd')),
              offline: countTrueFalseMap(guild.members.map(m => m.presence.status === 'offline'))
            }
          ),
          true
        )
        .addField(
          `Channels[${guild.channels.size}]`,
          strTemplate(
            '{category} category\n{text} text channel\n{vc} voice channel',
            {
              category: countTrueFalseMap(guild.channels.map(c => c.type === 'category')),
              text: countTrueFalseMap(guild.channels.map(c => c.type === 'text')),
              vc: countTrueFalseMap(guild.channels.map(c => c.type === 'voice'))
            }
          ),
          true
        )
        .addField('Server Owner', `${guild.owner.user.tag} (${guild.ownerID})`)
        .addField('Created On', Moment(guild.createdAt).format(client.constant.defaultMomentTemplate))
        .addField(
          `Roles [${guild.roles.size}]`,
          `To see all the roles in this server, please type **${client.prefix}${this.help.name} roles**.`
        );
    }
    // Roles info
    else {
      const listRoles = (): string => {
        let count = 0;
        let strRet: string = '';
        guild.roles.forEach(role => {
          count++;
          if (count === 1) {
            strRet += `${count.toString().padStart(3, '0')}.${role.name} `
          }
          else {
            strRet += `\n${count.toString().padStart(3, '0')}.${role.name} `
          }
        })
        return strRet;
      }

      embed
        .setDescription(
          strTemplate(
            'There is the list of roles in this server.\n```{roles} ```',
            {
              roles: listRoles()
            }
          )
        );
    }

    message.channel.send(`<@!${message.author.id}>`, { embed: embed })
  }
}
