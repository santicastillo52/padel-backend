
module.exports = (sequelize, DataTypes) => {
  const Club = sequelize.define('Club', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Club.associate = (models) => {
    Club.belongsTo(models.User, { foreignKey: 'UserId' });
    Club.hasMany(models.Court, { foreignKey: 'clubId' });
  };

  return Club;
};


