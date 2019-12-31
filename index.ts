import log from 'Components/Console'
import { ShardingManager } from 'discord.js'
import path from 'path'

require('module-alias/register')
require('dotenv').config()

if (process.argv[2] === 'dev') {
  log.info('ENGINE', 'This bot in development mode')
  process.env.DEV = 'dev'
  main()
} else {
  log.info('ENGINE', 'Live!')
  main()
}

function main () {
  const shards = new ShardingManager(path.resolve(__dirname, 'Components/Initial.ts'), {
    token: process.env.TOKEN,
    totalShards: 'auto'
  })

  shards.on('launch', shard => {
    log.info('ENGINE', `[SHARDS#${shard.id}] Your bot is live!`)
  })

  shards.on('message', (shard, message) => {
    log.info('ENGINE', `[SHARDS#${shard.id}] ${message._eval} | ${message._result}`)
  })

  shards.spawn()
  log.info('ENGINE', 'Initialize')
}
