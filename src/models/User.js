

module.exports = (sequelize,DataTypes) => { 
  const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'client'),
    allowNull: false,
  },
  position: {
    type: DataTypes.ENUM('reves', 'drive', 'both'),
    allowNull: true,
  }  

  
}, 
{
  tableName: 'Users',
  timestamps: false, // 🔹 Desactiva los timestamps
});
 User.associate = (models) => {
    User.hasMany(models.Club, {
      foreignKey: 'UserId'
    });
  };
return User;
}
