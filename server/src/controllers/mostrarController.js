const connection = require('../models/db.js');

module.exports.mostrarPaciente = async (req, res) => {
    const obtenerPacientes = 'SELECT * FROM pacientes';

    try {
        connection.query(obtenerPacientes, (err, result) => {
            if (err) {
                console.log('Error al obtener los pacientes guardados:', err);
                return res.send({ MessageEvent: 'Error al obtener los pacientes.' });
            }
            
            if (result.length === 0) {
                return res.send({ MessageEvent: 'No hay pacientes registrados en la base de datos.' });
            }

            console.log('Pacientes obtenidos correctamente:', result);
            return res.send(result); // Aquí retornas la lista de pacientes
        });
    } catch (e) {
        return res.send({ MessageEvent: 'Error al obtener los pacientes de la lista.' });
    }
};
