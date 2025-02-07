const connection = require('../models/db.js');

module.exports.listarHistorias = async (req, res) => {
    // Consulta para obtener todos los datos necesarios desde la tabla historial
    const getHistoriasQuery = `
        SELECT historial.idPaciente, historial.fecharegistro, historial.nota, 
               pacientes.name AS pacienteNombre
        FROM historial
        JOIN pacientes ON historial.idPaciente = pacientes.id
    `;

    try {
        connection.query(getHistoriasQuery, (err, results) => {
            if (err) {
                console.log('Error al obtener las historias:', err);
                return res.send({ MessageEvent: 'Error al obtener las historias.' });
            } else {
                console.log('Historias obtenidas correctamente:', results);
                return res.send({ historias: results });
            }
        });
    } catch (e) {
        console.log('Error al procesar la solicitud:', e);
        return res.send({ MessageEvent: 'Error al procesar la solicitud.' });
    }
};
