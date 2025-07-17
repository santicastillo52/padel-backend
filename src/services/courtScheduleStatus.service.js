const { DateTime } = require('luxon');
const courtScheduleProvider = require("../providers/courtsSchedules.providers");

/**
 * Servicio simple para actualizar automáticamente el estado de los horarios de cancha
 * cuando se cumple la hora final de las reservas.
 */

/**
 * Actualiza el estado de los horarios de cancha que han terminado.
 * Cambia el estado de "booked" a "available" para las reservas que ya han finalizado.
 */
const updateFinishedBookingsStatus = async () => {
  try {
    const now = DateTime.now();
    const currentTime = now.toFormat('HH:mm:ss');
    const currentDate = now.toFormat('yyyy-MM-dd');
    
    console.log(`[${now.toFormat('yyyy-MM-dd HH:mm:ss')}] Verificando reservas terminadas...`);
    
    // Obtener reservas que han terminado
    const finishedBookings = await courtScheduleProvider.getFinishedBookingsFromDB(
      currentTime,
      currentDate
    );
    
    if (finishedBookings.length > 0) {
      // Actualizar el estado de cada horario a "available"
      const updatePromises = finishedBookings.map(booking => 
        courtScheduleProvider.updateCourtScheduleStatusInDB(
          booking.CourtSchedule.id,
          "available"
        )
      );
      
      await Promise.all(updatePromises);
      console.log(`✅ Se actualizaron ${finishedBookings.length} horarios de cancha a estado "available"`);
    } else {
      console.log('ℹ️ No hay reservas terminadas para actualizar');
    }
    
    return finishedBookings.length;
  } catch (error) {
    console.error("❌ Error actualizando estados de horarios terminados:", error.message);
  }
};

/**
 * Inicia el servicio automático que se ejecuta cada 30 minutos.
 * Esta función debe ser llamada al iniciar la aplicación.
 */
const startAutomaticStatusUpdate = () => {
  console.log('🚀 Iniciando servicio automático de actualización de estados (cada 30 minutos)');
  
  // Ejecutar inmediatamente al iniciar
  updateFinishedBookingsStatus();
  
  // Programar ejecución cada 30 minutos (30 * 60 * 1000 = 1,800,000 ms)
  setInterval(updateFinishedBookingsStatus, 30 * 60 * 1000);
};

module.exports = {
  updateFinishedBookingsStatus,
  startAutomaticStatusUpdate
}; 