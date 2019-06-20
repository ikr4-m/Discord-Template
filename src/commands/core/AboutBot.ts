import { Client, Message, CommandComponent } from '@type/Bot';
import { RichEmbed } from 'discord.js';

const thistemplatelink: string = 'https://github.com/skymunn/Discord-Template';
import _ThisPlugin from '../plugin/core_AboutBot/index';
let ThisPlugin = new _ThisPlugin();

export default class AboutBot implements CommandComponent {
  help = {
    name: 'about',
    description: 'About this bot',
    usage: 'about'
  }

  config = {
    aliases: [],
    cooldown: 5,
    direct_message: true
  }

  async run(client: Client, message: Message, args: string[]) {
    let embed = new RichEmbed();

    // Embed maker
    embed
      .setTimestamp()
      .setColor(client.color)
      .setFooter(
        `Running with ${await ThisPlugin.linkGeneratorGithub('skymunn', 'Discord-Template', true)}. Click the title!`,
        message.author.displayAvatarURL
      )
      .setThumbnail(client.user.displayAvatarURL)
      .setAuthor(
        `${client.config.bot_name} Info`,
        client.user.displayAvatarURL,
        thistemplatelink
      )

      // Owner, based owner_id[0]
      .addField('Owner', `<@!${client.config.owners_id[0]}>`, true)
      // Your bot repository, you can change it anyway.
      .addField('Bot Repository', await ThisPlugin.linkGeneratorGithub('skymunn', 'Discord-Template'), true)
      // Server size
      .addField('Server Size', `${client.guilds.size} servers`, true)
      // Commands Available
      .addField('Command Available', `${client.commands.size} commands`, true)
      // Show shards
      .addField(
        'Shards',
        !client.shard ? 'No shards' : client.shard.count,
        true
      )
      // Location shards
      .addField(
        'Shards',
        !client.shard ? 'No shards' : client.shard.id,
        true
      )
      // Memory usage
      .addField('Memory Usage', ThisPlugin.memoryUsage(), true)

    message.channel.send(`<@!${message.author.id}>`, { embed: embed });
  }
}
