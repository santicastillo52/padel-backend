module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('court', 'club'), allowNull: false }
  });

  Image.associate = (models) => {
    Image.belongsTo(models.Court, { foreignKey: { allowNull: true } });
    Image.belongsTo(models.Club, { foreignKey: { allowNull: true } });
    models.Court.hasMany(Image);
    models.Club.hasMany(Image);
  };

  return Image;
};
