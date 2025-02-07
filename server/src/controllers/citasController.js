const connection = require('../models/db.js');

module.exports.cita = async (req, res) => {
    const { idpaciente, fecha, hora, motivo, doctor } = req.body;

    // Validaciones básicas
    if (!idpaciente || !fecha || !hora || !motivo || !doctor) {
        return res.send({ MessageEvent: 'Todos los campos son obligatorios.' });
    }

    // Insertar nueva cita
    const insertCita = 'INSERT INTO citas (idpaciente, fecha, hora, motivo, doctor) VALUES (?, ?, ?, ?, ?)';

    try {
        connection.query(insertCita, [idpaciente, fecha, hora, motivo, doctor], (err, result) => {
            if (err) {
                console.log('Error al insertar la cita:', err);
                return res.send(err);
            } else {
                console.log('Cita registrada correctamente en la BD:', result);
                return res.send({ MessageEvent: 'Cita registrada exitosamente en la BD.' });
            }
        });
    } catch (e) {
        console.log('Error en el registro de la cita:', e);
        return res.send({ MessageEvent: 'Error en el registro de la cita' });
    }
};
