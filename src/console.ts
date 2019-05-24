import * as Config from './config.json';
import chalk from 'chalk';

const log = {
  getTime: () => `[${new Date().toISOString()}]`,
  pid: process.pid,
  executor: (value: string, name: string, level: string) => {
    let entry = value.split('\n');
    let finVal: string;

    if (entry.length > 1) {
      entry.forEach(txt => {
        finVal += `\n${' '.repeat(4)}${txt}`
      })
    }
    else {
      finVal = value;
    }

    console.log(
      `${chalk.red(log.getTime())} ${name}/${log.pid} ${level}: ${chalk.cyan(value)}`
    )
  }
}

let bot_name = Config['bot_name'];
export default {
  name: bot_name,
  info: (value: string) => {
    log.executor(value, bot_name, chalk.blue(' INFO'));
  },
  error: (value: string) => {
    log.executor(value, bot_name, chalk.redBright('ERROR'));
  }
}