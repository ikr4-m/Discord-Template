export interface CommandList {
  command: string | string[]
  denial: string
  description: string
  usage?: string | UsageConstructor[]

  cooldown?: number
  permission?: string | string[]

  run: any
}

export interface UsageConstructor {
  optional?: string[]
  require?: string[]
}
