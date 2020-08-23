import { CommandArguments } from '../../../@Types/Command';

export default (args: CommandArguments[]) => {
  let str = ''
  args.forEach(arg => {
    if (arg.require === true && arg.type === 'BLOCK') {
      str += `<${arg.name}> `
    }
    if (arg.require === false && arg.type === 'BLOCK') {
      str += `[${arg.name}] `
    }
    if (arg.require === true && arg.type === 'FLAG') {
      str += `--${arg.name} `
    }
  })

  return str
}
