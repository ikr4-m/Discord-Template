import { Client, Message, CommandComponent } from '@type/Bot';

export default class NameCommand implements CommandComponent {
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

  async run(client: Client, message: Message, args: string[]) {
    // Code here
  }
}
