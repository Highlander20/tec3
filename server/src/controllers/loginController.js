const connection = require('../models/db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.login = (req, res) => {
    const {username, password} = req.body;


    // Consulta solo por el nombre de usuario, ya que la contraseña está encriptada
    const consult = 'SELECT * FROM usuarios WHERE username = ?';

    try {
        connection.query(consult, [username], (err, result) => {
            if (err) {
                // Si hay un error en la consulta a la base de datos
                return res.status(500).json({ error: 'Error en la consulta de la base de datos' });
            }

            if (result.length === 0) {
                // Si el usuario no existe
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const user = result[0];

            // Comparar la contraseña ingresada con la contraseña encriptada en la base de datos
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    // Si ocurre un error al comparar las contraseñas
                    return res.status(500).json({ error: 'Error al comparar las contraseñas' });
                }

                if (!isMatch) {
                    // Si la contraseña no coincide
                    return res.status(401).json({ message: 'Contraseña incorrecta' });
                }

                // Si la contraseña es correcta, generamos el token
                const token = jwt.sign({ username: user.username, id: user.id }, 'Stack', {
                    expiresIn: '30m' // El token expira en 30 minutos
                });

                // Devolver el token
                return res.status(200).json({ token });
            });
        });
    } catch (e) {
        // Si ocurre un error no esperado en el servidor
        return res.status(500).json({ error: 'Error interno del servidor' });
    }

};