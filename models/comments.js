'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      Comments.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
    }
  }
  Comments.init({
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Comments',
  }, {
    paranoid: true,
    timestamps: true
  });
  return Comments;
};