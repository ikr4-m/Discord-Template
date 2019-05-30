import { Client } from '@type/Bot';
import log from '../../console';
import timer from 'timer-machine';
import { readdirSync } from 'fs';

export default (client: Client) => {
  log.info('CLIENT', 'Handshake to Discord Successfully!');

  let Timer = new timer();
  Timer.start();

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
  Timer.stop();

  // console.log(cate);
  Object.keys(cate).forEach(ele => {
    log.info('EVENT', `Loaded ${cate[ele]['count']} from handler/events/${ele}.`);
  });

  log.info('EVENT', `Loaded ${events.length} plugin from Ready event. (${Timer.time()} ms)`);
}