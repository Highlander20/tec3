const connection = require('../models/db.js');

module.exports.paciente = async (req, res) => {
    const { name, apellido, dni, genero, alergia, fecha, direccion, telefono, email } = req.body;

    // Validaciones básicas
    if (!name || !apellido || !dni || !genero || !fecha || !direccion || !telefono || !email) {
        return res.send({ MessageEvent: 'Todos los campos son obligatorios.' });
    }

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.send({ MessageEvent: 'El correo electrónico no es válido.' });
    }

    // Convertir la fecha a solo el formato `YYYY-MM-DD`
    const soloFecha = fecha.split('T')[0]; // Si fecha es tipo string con formato ISO

    // Verificar si el DNI ya existe
    const checkDni = 'SELECT * FROM pacientes WHERE dni = ?';
    try {
        connection.query(checkDni, [dni], (err, result) => {
            if (err) {
                console.log('Error en la consulta:', err);
                return res.send(err);
            }

            if (result.length > 0) {
                return res.send({ MessageEvent: 'El DNI ya existe en la base de datos.' });
            } else {
                // Insertar nuevo paciente
                const insertPaciente = 'INSERT INTO pacientes (name, apellido, dni, genero, alergia, fecha, direccion, telefono, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                connection.query(insertPaciente, [name, apellido, dni, genero, alergia, soloFecha, direccion, telefono, email], (err, result) => {
                    if (err) {
                        console.log('Error al insertar el paciente:', err);
                        return res.send(err);
                    } else {
                        console.log('Paciente registrado correctamente en la BD:', result);
                        return res.send({ MessageEvent: 'Paciente registrado exitosamente en la BD.' });
                    }
                });
            }
        });
    } catch (e) {
        return res.send({ MessageEvent: 'Error en el registro del paciente' });
    }
};
