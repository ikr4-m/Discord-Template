import { Sequelize } from 'sequelize'
import Path from 'path'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: Path.join(__dirname, '../../../Database/database.db')
})

const checkConnection = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    sequelize.authenticate({ logging: false })
      .then(() => resolve(true))
      .catch(err => reject(err))
  })
}

export { sequelize as Sequelize, checkConnection }
