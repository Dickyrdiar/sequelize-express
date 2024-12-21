'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with User
      Tag.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

      // Define many-to-many association with Questions through a junction table
      Tag.belongsToMany(models.Question, { through: 'QuestionTags', foreignKey: 'tagId', as: 'questions' });
    }
  }

  Tag.init({
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Tag',
  });

  return Tag;
};