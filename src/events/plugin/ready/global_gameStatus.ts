import * as config from '../../../config.json';
import * as status from '../../../assets/db/status.json';
import strTemplate from 'string-template';
import { Client } from '../../../Bot';

const prefix = process.env.DEV ? config['bot_dev_prefix'] : config['bot_prefix'];

export default (client: Client) => {
  // Initialize template
  let gameStatus = (value: string) => `${prefix}help | ${value}`;

  // Is debug mode
  if (process.env.DEV) {
    client.user.setPresence({
      game: {
        name: gameStatus('DEBUG MODE')
      }
    });
  }
  // Normal
  else {
    let statuses: string[] = [];
    statuses.push(strTemplate(status['user'], client.users.size));
    if (!config['server_private']) {
      statuses.push(strTemplate(status['channel'], client.channels.size));
      statuses.push(strTemplate(status['server'], client.guilds.size));
    }
    // Push random status
    status.addition.forEach(text => {
      statuses.push(text);
    })
    const randomGame = (): void => {
      let leng = statuses.length;
      let randNum = Math.floor(Math.random() * leng);
      client.user.setPresence({
        game: {
          name: gameStatus(statuses[randNum])
        }
      })
    }
    setInterval(() => { randomGame() }, 15000);
  }
}