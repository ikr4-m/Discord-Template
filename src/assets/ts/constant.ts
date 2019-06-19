export default class Constant {
  public defaultMomentTemplate: string = 'MMMM Do YYYY [@] h:mm:ss A [UTC]Z';

  public usage(prefix: string, usage: string): string {
    return `the correct usage of this command is:\n**\`\`\`${prefix}${usage}\`\`\`**`;
  }
}