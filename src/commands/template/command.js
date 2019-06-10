import { Client, Message } from '../extend';

export default class AvatarUser {
  help = {
    name: 'nameOfCommandNoSpace',
    description: 'description of the command',
    usage: 'usage of command'
  }

  config = {
    aliases: ['aliases', 'here', 'folks'],
    cooldown: 5,
    direct_message: true
  }

  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {string[]} args 
   */
  run(client, message, args) {
    // Code here
  }
}