import FS from 'fs'

describe('checking event', () => {
  it('event is found', () => {
    FS.readdir('./src/App/Events/', (err, events) => {
      if (err) expect(err).toThrow('ENODIR: Directory not found')

      const lenEvents = events.length > 0
      expect(lenEvents).toBe(true)
    })
  })

  it('command group is found', () => {
    FS.readdir('./src/App/Commands', (err, group) => {
      if (err) expect(err).toThrow('ENODIR: Directory not found')

      const lenGroup = group.length > 0
      expect(lenGroup).toBe(true)
    })
  })
})
