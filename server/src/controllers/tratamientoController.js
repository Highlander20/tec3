const connection = require('../models/db.js');

module.exports.tratamiento = async (req, res) => {
    const { idPaciente, diente, tratamiento, fecha, observacion, costototal } = req.body;

    // Validaciones básicas
    if (!idPaciente || !diente || !tratamiento || !fecha || !observacion || !costototal) {
        return res.send({ MessageEvent: 'Todos los campos son obligatorios.' });
    }

    // Validación para el costo total (asegúrate de que sea un número positivo)
    if (isNaN(costototal) || costototal <= 0) {
        return res.send({ MessageEvent: 'El costo total debe ser un número positivo.' });
    }

    // Insertar nuevo tratamiento
    const insertTratamiento = 'INSERT INTO tratamientos (idPaciente, diente, tratamiento, fecha, observacion, costototal) VALUES (?, ?, ?, ?, ?, ?)';
    
    try {
        connection.query(insertTratamiento, [idPaciente, diente, tratamiento, fecha, observacion, costototal], (err, result) => {
            if (err) {
                console.log('Error al insertar el tratamiento:', err);
                return res.send(err);
            } else {
                console.log('Tratamiento registrado correctamente en la BD:', result);
                return res.send({ MessageEvent: 'Tratamiento registrado exitosamente en la BD.' });
            }
        });
    } catch (e) {
        console.log('Error en el registro del tratamiento:', e);
        return res.send({ MessageEvent: 'Error en el registro del tratamiento' });
    }
};
