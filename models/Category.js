module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: DataTypes.STRING,
    },
    {
      tableName: 'Categories',
      timestamps: false,
    });
    Category.associate = (models) => {
      Category.belongsToMany(models.BlogPost, { 
        through: models.PostCategory, foreignKey: 'categoryId', as: 'posts',
      });
    };
    return Category;
  };
