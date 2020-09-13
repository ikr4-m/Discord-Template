import { Sequelize } from './_Connection'
import { DataTypes, Model } from 'sequelize'

class Test extends Model {
  public id!: number
  public custom_text!: string
}

Test.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    custom_text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'test_table',
    sequelize: Sequelize
  }
)

export default Test
