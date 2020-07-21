export interface CommandOptions {
  name: string | string[]
  description: string
  cooldown?: number
  usage?: string
  example?: string
  args?: CommandArguments[]
  ownerOnly?: boolean
  disableDM?: boolean
}

export interface CommandArguments {
  name: string
  type: 'FLAG' | 'BLOCK'
}
