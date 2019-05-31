import { Client, Message } from 'discord.js';

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
    message.channel.send('AMANTAP');
  }
}