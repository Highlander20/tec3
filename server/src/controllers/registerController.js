const connection = require('../models/db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Importamos bcrypt para encriptar contraseñas

module.exports.register = async (req, res) => {
    const { username, password } = req.body;

    // Validación de la contraseña
    if (password.length < 8) {
        return res.send({ MessageEvent: 'La contraseña debe tener al menos 8 caracteres' });
    }

    // Comprobar si el usuario ya existe
    const checkUser = 'SELECT * FROM usuarios WHERE username = ?';

    try {
        connection.query(checkUser, [username], async (err, result) => {
            if (err) {
                console.log('Error en la consulta:', err); // Muestra detalles del error
                return res.send(err);
            }

            if (result.length > 0) {
                // Si el usuario ya existe, enviar mensaje de error
                return res.send({ MessageEvent: 'El usuario ya existe' });
            } else {
                // Encriptar la contraseña antes de guardarla
                const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de rondas de sal

                // Insertar nuevo usuario con la contraseña encriptada
                const insertUser = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
                connection.query(insertUser, [username, hashedPassword], (err, result) => {
                    if (err) {
                        console.log('Error al insertar el usuario:', err); // Muestra detalles del error
                        return res.send(err);
                    } else {
                        console.log('Usuario se registro correctamente sus datos:', result); // Confirma la inserción
                        // Generar token JWT tras un registro exitoso
                        const token = jwt.sign({ username }, "Stack", {
                            expiresIn: '30m'
                        });
                        return res.send({ token, MessageEvent: 'Usuario registrado exitosamente' });
                    }
                });
            }
        });
    } catch (e) {
        return res.send({ MessageEvent: 'Error en el registro' });
    }
}
