/**
 * This is module to run the commands.
 * Do not delete this file.
 */

import { Client, Message } from '@type/Bot';
import { Collection } from 'discord.js';
import log from '../../../console';
import strTemplate from 'string-template';

export default (client: Client, message: Message) => {
  let prefix = client.prefix;
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args[0].toLowerCase();
  let msg = message.content.toLowerCase();
  let commandFile = client.commands.get(cmd) || client.commands.get(<any>client.aliases.get(cmd));

  // If deveelopment
  if (process.env.DEV === 'true') {
    if (message.content.startsWith(prefix) && !client.config.owners_id.includes(message.author.id)) {
      return message.channel.send(`:wave: | Hello <@${message.author.id}>, this bot is under maintenanced.`);
    }
  }

  // Prefix
  if (msg === `<@${client.user.id}>` || msg === `<@!${client.user.id}>`) {
    return message.channel.send(`:wave: | Hello <@${message.author.id}>, this bot prefix is \`${prefix}\``);
  }

  // BEGIN COOLDOWN //
  let cooldown = new Collection<string, any>();

  if (!commandFile) return;
  if (!cooldown.has(commandFile.help.name)) {
    cooldown.set(commandFile.help.name, new Collection());
  }

  // Register member
  let member = message.author;
  let now = Date.now();
  let timestamps = cooldown.get(commandFile.help.name);
  let cooldownAmount = (commandFile.config.cooldown || 5) * 1000;

  if (!timestamps.has(member.id)) {
    timestamps.set(member.id, now);
  }
  else {
    let expirationTime = timestamps.get(member.id + cooldownAmount);
    if (now < expirationTime) {
      let timeLeft = (expirationTime - now) / 10000;
      return message.reply(`please wait about ${timeLeft} to using this command again.`);
    }
  }
  // END COOLDOWN //

  // Execute command
  try {
    if (!commandFile) return;
    commandFile.run(client, message, args.splice(1));
  }
  catch (error) {
    log.error('MESSAGE', error);
  }
  finally {
    // If in textChannel
    if (message.guild) {
      log.info(
        'MESSAGE',
        strTemplate(
          '{tag}[{id}] using {command} command!\nGuild:\t{guildName} | {guildLocation}\nGuild_ID:\t{guildID}\nChannel_ID:\t{channelID}',
          {
            tag: message.author.tag,
            id: message.author.id,
            command: cmd,
            guildName: message.guild.name,
            guildLocation: message.guild.region,
            guildID: message.guild.id,
            channelID: message.channel.id
          }
        )
      )
    }
    // If in directMessage
    else {
      log.info(
        'MESSAGE',
        strTemplate(
          '{tag}[{id}] using {command} command!\nIn your Direct Message.',
          {
            tag: message.author.tag,
            id: message.author.id,
            command: cmd
          }
        )
      )
    }
  }
}
