const connection = require('../models/db.js');

module.exports.historia = async (req, res) => {
    const { idpaciente, fecharegistro, nota } = req.body;

    // Validaciones básicas
    if (!idpaciente || !fecharegistro || !nota) {
        return res.send({ MessageEvent: 'Todos los campos son obligatorios.' });
    }

    // Insertar nueva historia clínica
    const insertHistoria = 'INSERT INTO historial (idpaciente, fecharegistro, nota) VALUES (?, ?, ?)';

    try {
        connection.query(insertHistoria, [idpaciente, fecharegistro, nota], (err, result) => {
            if (err) {
                console.log('Error al insertar la historia clínica:', err);
                return res.send(err);
            } else {
                console.log('Historia clínica registrada correctamente en la BD:', result);
                return res.send({ MessageEvent: 'Historia clínica registrada exitosamente en la BD.' });
            }
        });
    } catch (e) {
        console.log('Error en el registro de la historia clínica:', e);
        return res.send({ MessageEvent: 'Error en el registro de la historia clínica' });
    }
};
