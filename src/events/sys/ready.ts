import { Client } from '../../Bot';
import log from '../../console';
import timer from 'timer-machine';
import fs, { readdirSync } from 'fs';

export default (client: Client) => {
  log.info('[CLIENT] Handshake to Discord Successfully!');

  let Timer = new timer();
  Timer.start();
  const events = readdirSync('./src/events/plugin/ready').map(e => e.split('.')[0]);
  events.forEach(event => {
    require(`../plugin/ready/${event}`).default(client);
  });
  Timer.stop();
  log.info(`[EVENT] Loaded ${events.length} plugin from Ready event.`);
}