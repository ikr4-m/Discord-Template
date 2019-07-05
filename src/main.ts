/**
 * Discord-Template
 * (C) 2019 - All rights reserved.
 *
 * Sharding manager for private and public server.
 */

import log from './console';
import { ShardingManager } from 'discord.js';
import * as config from './config.json';
import path from 'path';

// START SHARDING MANAGER //

// Di sini, apabila botnya live maka mau gamau
// harus ngesharding. Kalau cuma development gapapa
// gapake sharding.

const shards = new ShardingManager(path.resolve(__dirname, './engine.ts'), {
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
log.info('ENGINE', 'Initialize');
