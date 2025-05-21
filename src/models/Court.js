


module.exports = (sequelize, DataTypes) => {
  const Court = sequelize.define('Court', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wall_type: {
      type: DataTypes.ENUM('acrylic', 'cement'),
      allowNull: false,
    },
    court_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    /*availability: {
      type: DataTypes.JSON,
      allowNull: false,
    },*/
  });

  Court.associate = (models) => {
    // Relación uno a muchos: Un club puede tener muchas canchas
    Court.belongsTo(models.Club, { foreignKey: 'clubId' });
  };

  return Court;
}

