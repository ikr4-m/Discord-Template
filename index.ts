/**
 * Discord-Template
 * (C) 2019 - All rights reserved.
 * 
 * The spawner of bot.
 */

import log from './src/console';
import { Threadify } from 'synchronous-ify';

Threadify.runner((_stream) => {
  require('dotenv').config();
  if (process.argv[2] === 'dev') {
    log.info("ENGINE", 'This bot in development mode!');
    process.env.DEV = 'dev';
    import('./src/main');
  }
  else {
    log.info("ENGINE", 'This bot in live mode!');
    import('./src/main');
  }
});
