'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      Question.hasMany(models.Comments, { foreignKey: 'Question', as: 'comments' });
    }
  }
  Question.init({
    question: DataTypes.STRING,
    desc: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    questionId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'questions', // Link to `questions` table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  },
  {
    sequelize,
    modelName: 'Question',
  }, {
    paranoid: true,
    timestamps: true
  });

  return Question;
};