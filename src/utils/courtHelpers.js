/**
 * Devuelve la fecha del próximo día de la semana especificado a partir de una fecha dada.
 *
 * @param {number} targetWeekday - Día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado).
 * @param {Date} [fromDate=new Date()] - Fecha de referencia (opcional).
 * @returns {string} Fecha en formato YYYY-MM-DD correspondiente al próximo targetWeekday.
 */
function getNextDateForWeekday(targetWeekday, fromDate = new Date()) {
    const baseDate = new Date(fromDate);
    baseDate.setHours(0, 0, 0, 0);
    const currentWeekday = baseDate.getDay();
    let daysToAdd = (targetWeekday - currentWeekday + 7) % 7;
    if (daysToAdd === 0) daysToAdd = 7; // Siempre el próximo, no hoy
    baseDate.setDate(baseDate.getDate() + daysToAdd);
    return baseDate.toISOString().split('T')[0];
}

module.exports = { getNextDateForWeekday };