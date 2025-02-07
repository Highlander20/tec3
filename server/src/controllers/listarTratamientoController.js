const connection = require('../models/db.js');

module.exports.listarTratamientos = async (req, res) => {
    // Consulta para obtener todos los datos necesarios desde la tabla tratamientos
    const getPagosQuery = `
        SELECT tratamientos.idPaciente, tratamientos.diente, tratamientos.tratamiento, tratamientos.fecha, 
               tratamientos.observacion, tratamientos.costototal, tratamientos.pago, tratamientos.deuda,
               pacientes.name AS pacienteNombre
        FROM tratamientos 
        JOIN pacientes ON tratamientos.idPaciente = pacientes.id
    `;

    try {
        connection.query(getPagosQuery, (err, results) => {
            if (err) {
                console.log('Error al obtener los pagos:', err);
                return res.send({ MessageEvent: 'Error al obtener los pagos.' });
            } else {
                console.log('Pagos obtenidos correctamente:', results);
                return res.send({ pagos: results });
            }
        });
    } catch (e) {
        console.log('Error al procesar la solicitud:', e);
        return res.send({ MessageEvent: 'Error al procesar la solicitud.' });
    }
};
