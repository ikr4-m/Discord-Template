export default class Events {
  public events: string
  constructor(events: string) {
    this.events = events
  }

  public run(...args: any[]): any {
    console.log(args)
    throw new Error('Not implemented')
  }
}
