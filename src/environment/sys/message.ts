import { Client, Message } from '@type/Bot';
import { readdir } from 'fs';

// Executor and inisiator plugin
export default (client: Client, message: Message) => {
  if (message.author.bot) return;

  readdir('./src/environment/plugin/message/', (err, files) => {
    let file = files.map(ele => ele.split('.')[0]);
    require(`../plugin/message/${file}`).default(client, message);
  })
}