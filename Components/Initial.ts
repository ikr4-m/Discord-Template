import { DiscordClient } from './DiscordClient'

const newCli = new DiscordClient({
  fetchAllMembers: true,
  disabledEvents: ['USER_NOTE_UPDATE']
})

// Register all handler

// Login
newCli.login(process.env.TOKEN)
