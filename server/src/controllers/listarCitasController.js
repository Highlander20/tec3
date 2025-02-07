const connection = require('../models/db.js');

module.exports.listarCitas = async (req, res) => {
    // Consulta con JOIN para obtener el nombre del paciente
    const getCitasQuery = `
        SELECT citas.*, pacientes.name AS pacienteNombre 
        FROM citas 
        JOIN pacientes ON citas.idpaciente = pacientes.id
    `;

    try {
        connection.query(getCitasQuery, (err, results) => {
            if (err) {
                console.log('Error al obtener las citas:', err);
                return res.send({ MessageEvent: 'Error al obtener las citas.' });
            } else {
                console.log('Citas obtenidas correctamente:', results);
                return res.send({ citas: results });
            }
        });
    } catch (e) {
        console.log('Error al procesar la solicitud:', e);
        return res.send({ MessageEvent: 'Error al procesar la solicitud.' });
    }
};
