import React, { useState, useEffect } from 'react';
import './pago.css';

const PagoPacientePage = ({ onBack }) => {
    const [pacientes, setPacientes] = useState([]);
    const [tratamientos, setTratamientos] = useState([]);
    const [idPaciente, setIdPaciente] = useState('');
    const [idTratamiento, setIdTratamiento] = useState('');
    const [pago, setPago] = useState('');
    const [deuda, setDeuda] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Cargar pacientes y tratamientos al montar el componente
    useEffect(() => {
        fetch('http://localhost:3000/mostrarPaciente')
            .then(response => response.json())
            .then(data => setPacientes(data))
            .catch(error => console.log('Error al obtener los pacientes:', error));

        fetch('http://localhost:3000/mostrarTratamiento')
            .then(response => response.json())
            .then(data => setTratamientos(data))
            .catch(error => console.log('Error al obtener los tratamientos:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!idPaciente || !idTratamiento || !pago || deuda === '') {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        const pagoData = {
            idPaciente,
            idTratamiento,
            pago: parseFloat(pago),
            deuda: parseFloat(deuda)
        };

        fetch('http://localhost:3000/pago', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pagoData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(result => {
            if (result.MessageEvent === 'Pago registrado exitosamente en la BD.') {
                setSuccessMessage('Pago registrado exitosamente.');
                setErrorMessage('');
                // Limpiar el formulario
                setIdPaciente('');
                setIdTratamiento('');
                setPago('');
                setDeuda('');
            } else {
                setSuccessMessage('');
                setErrorMessage('Error al registrar el pago.');
            }
        })
        .catch(error => {
            console.log('Error al registrar el pago:', error);
            setSuccessMessage('');
            setErrorMessage('Error al registrar el pago.');
        });
    };

    return (
        <div>
            <button className="back-button33" onClick={onBack}>
                Regresar
            </button>

            <h1>Registrar Pago</h1>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit} className="pago-form">
                <label>
                    Nuevo Pago:
                    <input
                        type="number"
                        value={pago}
                        onChange={(e) => setPago(e.target.value)}
                        required
                        placeholder="Ingresa el monto del pago"
                    />
                </label>
                <label>
                    Deuda:
                    <input
                        type="number"
                        value={deuda}
                        onChange={(e) => setDeuda(e.target.value)}
                        required
                        placeholder="Ingresa la deuda restante"
                    />
                </label>
                <button type="submit">Actualizar pago</button>
            </form>
        </div>
    );
};

export default PagoPacientePage;
