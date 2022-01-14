const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
  }, {
      timestamps: false,
  });
  user.associate = (models) => {
      user.hasMany(models.BlogPost, { as: 'blogPosts', foreignKey: 'userId' }); // lazy loading
  };
  return user;
};

module.exports = User;
