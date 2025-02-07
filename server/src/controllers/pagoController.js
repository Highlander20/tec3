const connection = require('../models/db.js');

module.exports.pago = async (req, res) => {
    const { idPaciente, tratamiento, pago, deuda } = req.body;

    // Validaciones básicas
    if (!idPaciente || !tratamiento || pago === undefined || deuda === undefined) {
        return res.send({ MessageEvent: 'Todos los campos son obligatorios.' });
    }

    // Validación para el pago y deuda (asegúrate de que sean números y no negativos)
    if (isNaN(pago) || pago < 0) {
        return res.send({ MessageEvent: 'El pago debe ser un número no negativo.' });
    }
    if (isNaN(deuda) || deuda < 0) {
        return res.send({ MessageEvent: 'La deuda debe ser un número no negativo.' });
    }

    // Actualizar el pago y la deuda en la tabla tratamientos
    const updatePago = `
        UPDATE tratamientos 
        SET pago = ?, deuda = ? 
        WHERE idPaciente = ? AND tratamiento = ?
    `;

    try {
        connection.query(updatePago, [pago, deuda, idPaciente, tratamiento], (err, result) => {
            if (err) {
                console.log('Error al actualizar el pago:', err);
                return res.send(err);
            } else {
                if (result.affectedRows > 0) {
                    console.log('Pago actualizado correctamente en la BD:', result);
                    return res.send({ MessageEvent: 'Pago actualizado exitosamente en la BD.' });
                } else {
                    return res.send({ MessageEvent: 'No se encontró el registro para actualizar.' });
                }
            }
        });
    } catch (e) {
        console.log('Error en la actualización del pago:', e);
        return res.send({ MessageEvent: 'Error en la actualización del pago' });
    }
};
