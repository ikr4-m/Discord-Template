export interface Helper {
  location: string
  command: string[]
  module: Module
}

export interface Module {
  name: string
  hidden: boolean
}
