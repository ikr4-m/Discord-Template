export default class Constant {
  usage(prefix: string, usage: string): string {
    return `the correct usage of this command is:\n**\`\`\`${prefix}${usage}\`\`\`**`;
  }
}