import React, { useState, useEffect } from 'react';
import './historiacss.css'; // Asegúrate de que la ruta sea correcta

const HistoriaPage = ({ onBack }) => {
    // Estados para los campos del formulario
    const [pacientes, setPacientes] = useState([]);
    const [idpaciente, setPacienteId] = useState('');
    const [fecharegistro, setFechaRegistro] = useState('');
    const [nota, setNota] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // Estado para controlar la ventana emergente

    // Cargar pacientes al montar el componente
    useEffect(() => {
        fetch('http://localhost:3000/mostrarPaciente') // Cambia la URL según tu API
            .then(response => response.json())
            .then(data => {
                console.log('Pacientes:', data);
                setPacientes(data); // Guardamos los pacientes en el estado
            })
            .catch(error => console.log('Error al obtener los pacientes:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validación de los campos
        if (!idpaciente || !fecharegistro || !nota) {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }
    
        // Crear objeto de historia
        const historiaData = {
            idpaciente,
            fecharegistro,
            nota
        };
    
        // Enviar solicitud POST a la API
        fetch('http://localhost:3000/historia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(historiaData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(result => {
            console.log('Respuesta del servidor:', result);
            if (result.MessageEvent === 'Historia clínica registrada exitosamente en la BD.') {
                setErrorMessage('');
                setShowModal(true); // Mostrar modal de éxito
                // Limpiar el formulario
                setPacienteId('');
                setFechaRegistro('');
                setNota('');
            } else {
                setSuccessMessage('');
                setErrorMessage('Error al registrar la historia clínica.');
            }
        })
        .catch(error => {
            console.log('Error al guardar la historia clínica:', error);
            setSuccessMessage('');
            setErrorMessage('Error al guardar la historia clínica.');
        });
    };

    const handleCloseModal = () => {
        setShowModal(false); // Cerrar modal
    };

    return (
        <div>
            <button className="back-button15" onClick={onBack}>Regresar</button>

            <h1>Registro de Historia Clínica</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="historias-form">
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
                    Fecha de Registro:
                    <input
                        type="date"
                        value={fecharegistro}
                        onChange={(e) => setFechaRegistro(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Nota:
                    <input
                        type="text"
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                        required
                        placeholder="Ingresa la nota de la historia clínica"
                    />
                </label>
                <button type="submit">Registrar Historia Clínica</button>
            </form>

            {/* Modal de éxito */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¡Éxito!</h2>
                        <p>La historia clínica ha sido registrada exitosamente.</p>
                        <button className="modal-button" onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default HistoriaPage;
