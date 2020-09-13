const Sequelize = require('sequelize')
const { QueryInterface } = require('sequelize')

module.exports = {
  /**
   * @param {QueryInterface} query
   */
  up: async (query) => {
    await query.createTable('test', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      input: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },
  /**
   * @param {QueryInterface} query
   */
  down: async (query) => {
    await query.dropTable('test')
  }
}
