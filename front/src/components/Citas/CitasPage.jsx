import React, { useState, useEffect } from 'react';
import './citas.css'; // Asegúrate de que la ruta sea correcta

const CitasPage = ({ onBack }) => {
    // Estado para los campos del formulario
    const [pacientes, setPacientes] = useState([]); // Estado para almacenar la lista de pacientes
    const [idpaciente, setPacienteId] = useState(''); // Estado para el ID del paciente seleccionado
    const [fecha, setFecha] = useState(''); // Estado para la fecha
    const [hora, setHora] = useState(''); // Estado para la hora
    const [motivo, setMotivo] = useState(''); // Estado para el motivo
    const [doctor, setDoctor] = useState(''); // Estado para el doctor
    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
    const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
    const [showModal, setShowModal] = useState(false); // Estado para controlar la ventana emergente


    // Cargar pacientes al montar el componente
    useEffect(() => {
        fetch('http://localhost:3000/mostrarPaciente') // Cambia la URL según tu API
            .then(response => response.json())
            .then(data => {
                console.log('Pacientes:', data); // Verifica los datos en la consola
                setPacientes(data); // Guardamos los pacientes en el estado
            })
            .catch(error => console.log('Error al obtener los pacientes:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Verificar qué valores se están enviando
        console.log("Valores del formulario:");
        console.log("Paciente ID:", idpaciente);
        console.log("Fecha:", fecha);
        console.log("Hora:", hora);
        console.log("Motivo:", motivo);
        console.log("Doctor:", doctor);
    
        // Validar que todos los campos requeridos están presentes
        if (!idpaciente || !fecha || !hora || !motivo || !doctor) {
            setErrorMessage('Todos los campos son obligatorios.'); // Mostrar mensaje de error
            return; // No continuar si hay campos vacíos
        }
    
        // Crear objeto de cita
        const citaData = {
            idpaciente, // Usar el ID del paciente
            fecha,
            hora,
            motivo,
            doctor
        };
    
        console.log("Datos a enviar:", citaData); // Verifica los datos antes de enviarlos
    
        // Enviar solicitud POST a la API
        fetch('http://localhost:3000/cita', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(citaData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(result => {
            console.log('Respuesta del servidor:', result);
            if (result.MessageEvent === 'Cita registrada exitosamente en la BD.') {
                setErrorMessage(''); // Limpiar mensaje de error
                setShowModal(true); // Mostrar modal de éxito
                // Limpiar el formulario
                setPacienteId('');
                setFecha('');
                setHora('');
                setMotivo('');
                setDoctor('');
            } else {
                setSuccessMessage('');
                setErrorMessage('Error al registrar la cita.'); // Mostrar mensaje de error
            }
        })
        .catch(error => {
            console.log('Error al guardar la cita:', error);
            setSuccessMessage('');
            setErrorMessage('Error al guardar la cita.'); // Mostrar mensaje de error
        });
    };


    const handleCloseModal = () => {
        setShowModal(false); // Cerrar modal
    };

    return (
        <div>
            {/* Botón de regresar */}
            <button className="back-button" onClick={onBack}>
                Regresar
            </button>

            <h1>Programación de Cita</h1>

            {successMessage && <p className="success-message">{successMessage}</p>} {/* Mostrar mensaje de éxito */}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error */}

            <form onSubmit={handleSubmit} className="citas-form">
                <label>
                    Paciente:
                    <select value={idpaciente} onChange={(e) => setPacienteId(e.target.value)} required>
                        <option value="">Selecciona un paciente</option>
                        {pacientes.map((paciente) => (
                            <option key={paciente.id} value={paciente.id}>
                                {paciente.name} {paciente.apellido}
                            </option>
                        ))}
                    </select>

                </label>
                <label>
                    Fecha de la Cita:
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Hora de la Cita:
                    <input
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Motivo de la Cita:
                    <select
                        name="motivo"
                        id="motivo"
                        required
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                    >
                        <option value="" disabled>Seleccione un tratamiento</option>
                        <option value="Ortodoncia">Ortodoncia</option>
                        <option value="Endodoncia">Endodoncia</option>
                        <option value="Consulta">Consulta</option>
                        <option value="Fisioterapia Ox">Fisioterapia Ox</option>
                        <option value="Obturacion">Obturacion</option>
                        <option value="Exodoncia">Exodoncia</option>
                        <option value="Protesis fija">Protesis fija</option>
                        <option value="Incrustacion">Incrustacion</option>
                        <option value="Protesis removible">Protesis removible</option>
                        <option value="Perno muñon">Perno muñon</option>
                        <option value="Aditamento protesis">Aditamento protesis</option>
                        <option value="Encerado de diagnostico">Encerado de diagnostico</option>
                        <option value="Blanqueamiento">Blanqueamiento</option>
                        <option value="Cirugia">Cirugia</option>
                    </select>
                </label>

                <label>
                    Doctor Asignado:
                    <select
                        name="doctor"
                        id="doctor"
                        required
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                    >
                        <option value="" disabled>Seleccione un Doctor</option>
                        <option value="Dr.Emerson">Dr. Emerson</option>
                    </select>
                </label>

                <button type="submit">Programar cita</button>
            </form>

            {/* Modal de éxito */}
            {showModal && (
                <div className="modal2">
                    <div className="modal-content2">
                        <h2>¡Éxito!</h2>
                        <p>La cita ha sido registrada exitosamente.</p>
                        <button className="modal-button2" onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CitasPage;
