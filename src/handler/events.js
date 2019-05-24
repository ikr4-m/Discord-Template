import { Client } from '../Bot';
import { readdirSync } from 'fs';

/**
 * @param {Client} client
 */
const eventHandler = (client) => {
  const events = readdirSync('./src/events/sys').map(e => e.split('.')[0]);
  events.forEach(event => {
    let file = require(`../events/sys/${event}`).default;
    client.on(
      event, (...args) => file(client, ...args)
    )
  })
}

export default eventHandler;
