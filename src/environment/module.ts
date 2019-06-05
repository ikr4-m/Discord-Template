import { Client, CommandComponent, ModuleCommand } from '@type/Bot';
import * as fs from 'fs';
import log from '../console';
import strTemplate from 'string-template';

export default async (client: Client) => {
  fs.readdir('./src/commands', (err, categories) => {

    // Remove plugin folder in this list.
    //
    // You can add more folder/file exception list
    // in exception_list array below.
    let exception_list = ['plugin', 'README.md'];

    if (err) throw err;
    log.info(
      'MODULE',
      strTemplate(
        'Fetch {cateSize} categor{cateS} in this session',
        {
          cateSize: categories.length - exception_list.length,
          cateS: (categories.length - exception_list.length) > 1 ? 'ies' : 'y'
        }
      )
    )

    categories.forEach(category => {

      // Return if the folder is in exception list.
      if (exception_list.includes(category)) return;

      try {
        let moduleConf: ModuleCommand = require(`../commands/${category}/module.json`);
        moduleConf.cmds = [];
        client.helps.set(category, moduleConf);
      }
      catch (error) {
        let err = new Error();
        err.name = 'MODULE_NOT_FOUND';
        err.message = `Cannot find file module in ${category} folder!`;
        throw err;
      }

      fs.readdir(`./src/commands/${category}`, (err, files) => {

        log.info('MODULE', `Fetch ${files.length - 1} command${(files.length - 1) > 1 ? 's' : ''} from [${category}]`);
        files.forEach(file => {
          // Support JavaScript ES6 too!
          if (!file.endsWith('.ts') && !file.endsWith('.js')) return;

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
}