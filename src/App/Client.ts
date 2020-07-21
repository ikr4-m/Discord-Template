import { Client as BaseClient, ClientOptions, Collection } from 'discord.js'
import DBConn from '../Engine/DatabaseConnection'

export default class Client extends BaseClient {
  public command = new Collection<string, any>()
  public alias = new Collection<string, string>()
  public database = DBConn
  
  constructor(opt: ClientOptions) { super(opt) }
}
