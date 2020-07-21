import Client from './App/Client'
import LoadEvents from './Engine/LoadEvents'
import ConsoleStamp from 'console-stamp'
import DJSLight from 'discord.js-light'
import 'dotenv/config'

ConsoleStamp(console)
const client = new DJSLight.Client({
  cacheGuilds: false,
  cacheChannels: false,
  cacheOverwrites: false,
  cacheRoles: false,
  cacheEmojis: false,
  cachePresences: false,
  fetchAllMembers: false,
  disableMentions: 'everyone'
}) as Client

LoadEvents(client)

client.login(process.env.TOKEN)
