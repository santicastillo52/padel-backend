/*'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.js')[env];

const db = {};

let sequelize;

// Si usas una variable de entorno para la URL de la base de datos, usa esa configuración.
if (config.use_env_variable) {
 
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Lee todos los archivos en la carpeta actual (excepto este mismo archivo) y carga los modelos
fs
  .readdirSync(__dirname)
  .filter(file => 
    file.indexOf('.') !== 0 &&  // No tomar los archivos ocultos (como .DS_Store)
    file !== basename &&        // No cargar este archivo
    file.slice(-3) === '.js' && // Solo archivos .js
    !file.includes('.test.js')  // Excluir archivos de prueba
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Ejecutar asociaciones entre los modelos si existen
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Agregar sequelize y Sequelize al objeto db para poder usarlos en otras partes de la aplicación
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
*/