import { Client, Message, CommandComponent } from '@type/Bot';
import util from 'util';

export default class EvaluationCode implements CommandComponent {
  help = {
    name: 'eval',
    description: 'Evaluation your code in JavaScript style.',
    usage: 'eval <javascript_code_block>'
  }

  config = {
    aliases: ['aliases', 'here', 'folks'],
    cooldown: 5,
    direct_message: false
  }

  async run(client: Client, message: Message, args: string[]) {
    // ONLY OWNER CAN DO THIS MOTHERFUCKER
    if (!client.config.owners_id.includes(message.author.id)) return;

    let code = args.join(' ');
    let msgID = message.id;

    // Detect the blockquote
    if (!code.startsWith('```js') && !code.startsWith('```')) {
      return message.reply(client.constant.usage(client.prefix, this.help.usage));
    }
    else {
      let newScript = code
        .match(/[^```]/gm)!
        .join('')
        .split('\n')
        .splice(1)
        .join('');

      // Try the code
      try {
        let __eval__ = eval(newScript);

        if (typeof __eval__ !== 'string')
          __eval__ = util.inspect(__eval__, { depth: 0 });

        message.channel.send(`Output:\n\`\`\`js\n${__eval__}\`\`\``);
      }
      catch (error) {
        message.channel.send(`Output:\n\`\`\`${error.message}\`\`\``);
      }
    }
  }
}
