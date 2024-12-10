'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Tags.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      Tags.associate = (models) => {
        Tags.belongsToMany(models.Questions, { through: 'Tags' })
      }
    }
  }
  Tags.init({
    tag: DataTypes.STRING,
    allowNull: false, // Correct placement of allowNull
  }, {
    sequelize,
    modelName: 'Tags',
    // tableName: 'tags',
    // timestamps: false
  });
  return Tags;
};