// src/app.js
const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require('./routes/users.routes.js'); 
const clubsRoutes = require('./routes/clubs.routes.js');
const bookingsRoutes = require('./routes/bookings.routes.js');
const courtSchedulesRoutes = require('./routes/courtsSchedules.routes.js');
const courtsRoutes = require('./routes/courts.routes.js');
const  imagesRoutes = require('./routes/images.routes.js'); // Importa las rutas de imágenes
const path = require('path');

const app = express();
app.use(express.json());

const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.use(userRoutes);
    app.use(clubsRoutes);
    app.use(bookingsRoutes);
    app.use(courtSchedulesRoutes);
    app.use(courtsRoutes);
    app.use(imagesRoutes);
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  


    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = startApp;
