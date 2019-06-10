import { Collection } from 'discord.js';

/**
 * Save here your temporary collection. It's global!
 */
export default class TemporaryCollection {
  public musicQueue: Collection<any, any> = new Collection();
}
