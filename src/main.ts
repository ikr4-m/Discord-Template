import log from './console';
import { ShardingManager } from 'discord.js';
import * as config from './config.json';

// START SHARDING MANAGER //

// Di sini, apabila botnya live maka mau gamau
// harus ngesharding. Kalau cuma development gapapa
// gapake sharding.

if (!config['server_private']) {
  const shards = new ShardingManager('./src/engine', {
    token: process.env.TOKEN,
    totalShards: 'auto'
  });

  shards.on('launch', shards => {
    log.info('ENGINE', `[SHARDS#${shards.id}] Your bot is live!`);
  });

  shards.on('message', (shards, message) => {
    log.info('ENGINE', `[SHARDS#${shards.id}] ${message._eval} | ${message._result}`);
  });

  shards.spawn();
}
else {
  log.info('ENGINE', 'Initialize');
  import('./engine');
}