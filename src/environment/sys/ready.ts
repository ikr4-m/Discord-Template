import { Client } from '@type/Bot';
import log from '../../console';
import { readdirSync } from 'fs';

export default (client: Client) => {
  log.info('CLIENT', 'Handshake to Discord Successfully!');

  const events = readdirSync('./src/environment/plugin/ready').map(e => e.split('.')[0]);
  const cate: any = {};

  events.forEach(event => {
    let category = event.split('_')[0];
    require(`../plugin/ready/${event}`).default(client);

    if (!cate[category]) {
      cate[category] = {
        count: 1,
        name: category
      }
    }
    else {
      cate[category]['count']++;
    }
  });

  // console.log(cate);
  Object.keys(cate).forEach(ele => {
    log.info('EVENT', `Loaded ${cate[ele]['count']} from handler/events/${ele}.`);
  });

  log.info('EVENT', `Loaded ${events.length} plugin from Ready event.`);

  // Get all the information about the server and shards
  let info = `Loaded ${client.guilds.size} guilds`;
  if (!(!client.shard)) {
    info += ` and ${client.shard.count} shard${client.shard.count > 1 ? 's' : ''}`;
  }
  log.info('CLIENT', info);

  // console.log(client.commands);
  // console.log(client.helps);
  // console.log(client.aliases);
}