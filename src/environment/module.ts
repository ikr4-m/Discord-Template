import { Client, CommandComponent, ModuleCommand } from '@type/Bot';
import * as fs from 'fs';
import log from '../console';

export default async (client: Client) => {
  fs.readdir('./src/commands', (err, categories) => {

    if (err) throw err;
    log.info('MODULE', `Fetch ${categories.length} categor${categories.length > 1 ? 'ies' : 'y'} in this session.`);

    categories.forEach(category => {

      let moduleConf: ModuleCommand = require(`../commands/${category}/module.json`);
      moduleConf.cmds = [];
      client.helps.set(category, moduleConf);

      fs.readdir(`./src/commands/${category}`, (err, files) => {

        log.info('MODULE', `Fetch ${files.length - 1} command${(files.length - 1) > 1 ? 's' : ''} from [${category}]`);
        files.forEach(file => {
          // Support JavaScript ES6 too!
          if (!file.endsWith('.ts') || !file.endsWith('.js')) return;

          // Input commands
          let command: CommandComponent = new (require(`../commands/${category}/${file.split('.')[0]}`).default)();
          client.commands.set(command.help.name, command);

          // Input aliases
          if (command.config.aliases) {
            command.config.aliases.forEach(alias => {
              client.aliases.set(alias, command.help.name);
            });
          }

          //Input this command into module
          let help: any = client.helps.get(category);
          help.cmds.push(command.help.name);
        })
      })
    })
  })
  // setTimeout(() => {
  //   console.log(client.commands);
  //   console.log(client.helps);
  //   console.log(client.aliases);
  // }, 5000);
}