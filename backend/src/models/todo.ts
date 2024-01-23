import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import sequelize from '../database/index'


export interface TodoModel
  extends Model<
    InferAttributes<TodoModel>,
    InferCreationAttributes<TodoModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>
  title: string
  description: string
  completed: boolean
}

const Todo = sequelize.define<TodoModel>('Todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'todo',
  timestamps: false
})

export default Todo
