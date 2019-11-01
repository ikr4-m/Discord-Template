/**
 * This is the handler of help command.
 * It is auto generated based from CommandComponent::config and
 * CommandComponent::help.
 * 
 * You can change it with your style.
 */
import { Client, Message, CommandComponent, Collection, ModuleCommand } from '@type/Bot';
import { RichEmbed } from 'discord.js';
import stringTemplate from 'string-template';

export default class HelpOfCommand implements CommandComponent {
  help = {
    name: 'help',
    description: 'The list of the command in here!',
    usage: 'help [usage]'
  }

  config = {
    aliases: ['?'],
    cooldown: 5,
    direct_message: true
  }

  async run(client: Client, message: Message, args: string[]) {
    let commands: Collection<string, CommandComponent> = client.commands;
    let helps: Collection<string, ModuleCommand> = client.helps;
    let commandInType = args[0];

    // Embed maker
    let embed = new RichEmbed();
    embed
      .setTimestamp()
      .setColor(client.color)
      .setFooter(
        stringTemplate(
          '(C) {thisYear} - {botName} | Running {size} command{sizess}.',
          {
            thisYear: new Date().getFullYear(),
            botName: client.config.bot_name,
            size: commands.size,
            sizess: commands.size > 1 ? 's' : ''
          }
        ),
        client.user.displayAvatarURL
      )
      .setThumbnail(client.user.displayAvatarURL);

    // Global Help
    if (!commandInType) {
      embed.setTitle('SansBot Command List');
      embed.setDescription(
        stringTemplate(
          'To check the use of commands on this bot, type in the chat: \n```{prefix}help <command>```\n' +
          'Please note, for giving arguments:\n' +
          '`{prefix}com [args]` **>>** The command argument is not required to be written.\n' +
          '`{prefix}com <args>` **>>** The command argumen is required to be written.\n' +
          '`{prefix}com [menu|m]` **>>** You can choose an argument between the square brackets.',
          {
            prefix: client.prefix
          }
        )
      );

      // Add field per category
      helps.forEach(category => {
        // Hide the commandCategory if in module.json hide property is true if
        // 1. Kalau gua owner, gua bisa liat semua command kalau w dm
        // 2. Kalau gua di server yang dapat hak khusus/strict, bakal muncul

        // In TextChannel
        if (message.guild) {
          // For me and all of member that cannot see the command
          if (category.hide === true) return;
          // For guild purposes
          if (!category.strict.includes(message.guild.id) && category.strict.length > 0) return;
        }
        // In DM
        else {
          // For me only hehe
          if (category.hide === true && !client.config.owners_id.includes(message.author.id)) return;
          // Hide all the guild command
          if (category.strict.length > 0) return;
        }

        embed.addField(category.name, `\`${category.cmds.join('` `')}\``, false)
      })
    }
    // Per command help
    else {
      // Search command, if commands did not found, throw usage of the command.
      let _commandFetch = commands.get(commandInType);
      if (!_commandFetch)
        return message.reply(client.constant.usage(client.prefix, this.help.usage));

      // Redeclare command that declare it.
      let commandFetch = <CommandComponent>_commandFetch;
      // Make it in embed 
      embed
        .setAuthor(`${client.prefix}${commandFetch.help.name} command usage.`)
        .addField('Description', commandFetch.help.description, false)
        .addField(
          'Aliases',
          commandFetch.config.aliases.length > 0
            ? `${client.prefix}${commandFetch.config.aliases.join(`, ${client.prefix}`)}`
            : 'No aliases found!',
          true
        )
        .addField(
          'Direct Message?',
          commandFetch.config.direct_message
            ? 'Yes'
            : 'No',
          true
        )
        .addField('Usage', `**${client.prefix}${commandFetch.help.usage}**`, false)
        .addField(
          'Examples',
          commandFetch.help.examples.length > 0
            ? `${client.prefix}${commandFetch.help.name} ${commandFetch.help.examples.join(`, ${client.prefix}${commandFetch.help.name}`)}`
            : 'No examples found!',
          true
        )
    }

    // Send it with mention
    message.channel.send(
      `<@${message.author.id}>`, { embed: embed }
    )
  }
}
