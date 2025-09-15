
require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/database');
const courtScheduleStatusService = require('./src/services/courtScheduleStatus.service');

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    
    // Inicializar el servicio automático de actualización de estados (cada 30 minutos)
    courtScheduleStatusService.startAutomaticStatusUpdate();
    
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
