import { Client } from './Bot';

const newClient = new Client({
  fetchAllMembers: true,
  disabledEvents: ['USER_NOTE_UPDATE']
});

// Register all the handler
require('./environment/events').default(newClient);

// Login
newClient.login(
  process.env.DEV
    ? process.env.TOKEN_DEV
    : process.env.TOKEN
)