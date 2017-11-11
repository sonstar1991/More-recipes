export default (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId',
      }
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Reviews.associate = (models) => {
    Reviews.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Reviews.belongsTo(models.User, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Reviews;
};
