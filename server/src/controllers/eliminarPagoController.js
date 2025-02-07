const connection = require('../models/db.js');

module.exports.eliminarPago = async (req, res) => {
    const { idPaciente } = req.params;

    const deletePagoQuery = `
        DELETE FROM tratamientos 
        WHERE idPaciente = ?
    `;

    try {
        connection.query(deletePagoQuery, [idPaciente], (err, results) => {
            if (err) {
                console.log('Error al eliminar el pago:', err);
                return res.send({ MessageEvent: 'Error al eliminar el pago.' });
            } else {
                console.log('Pago eliminado correctamente:', results);
                return res.send({ success: true, MessageEvent: 'Pago eliminado correctamente.' });
            }
        });
    } catch (e) {
        console.log('Error al procesar la solicitud:', e);
        return res.send({ MessageEvent: 'Error al procesar la solicitud.' });
    }
};
