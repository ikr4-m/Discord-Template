import { Client, Message, CommandComponent } from '@type/Bot';

export default class Pinging implements CommandComponent {
  help = {
    name: 'ping',
    description: 'p p p p p p p p',
    usage: 'ping'
  }

  config = {
    aliases: ['pong'],
    cooldown: 5,
    direct_message: true
  }

  async run(client: Client, message: Message, args: string[]) {
    let startTime = Date.now();
    message.channel
      .send(':ping_pong: | **Wait for some reason...**')
      .then((msg: any) => {
        let diff = (Date.now() - startTime).toLocaleString();
        let api = client.ping.toFixed(0);
        msg.edit(`Latency: ${diff} ms. | API: ${api} ms.`);
      })
  }
}
