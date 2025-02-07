import { useState, useEffect } from 'react';
import './lista.css';

const MostrarPacientesPage = ({ onBack }) => {
    const [pacientes, setPacientes] = useState([]); // Estado para la lista de pacientes
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda

    // Función para cargar los pacientes al montar el componente
    useEffect(() => {
        fetch('http://localhost:3000/mostrarPaciente') // Cambia la URL según tu API
            .then(response => response.json())
            .then(data => {
                console.log('Datos recibidos:', data); // Verifica los datos en la consola
                setPacientes(data); // Guardamos los pacientes en el estado
            })
            .catch(error => console.log('Error al obtener los pacientes de la BD:', error));
    }, []);

    // Filtrar pacientes según el término de búsqueda
    const filteredPacientes = pacientes.filter((paciente) =>
        paciente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.apellido.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Botón de regresar */}
            <button className="back-button5" onClick={onBack}>
                Regresar
            </button>

            {/* Mostrar lista de pacientes */}
            <h2>Lista de Pacientes</h2>
                
            {/* Campo de búsqueda */}
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Buscar paciente..." 
                    className="search-input" 
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
                />
                <button className="search-button">
                    <i className="fa fa-search"></i> {/* Ícono de lupa */}
                </button>
            </div>

            <table className="pacientes-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Género</th>
                        <th>Alergias</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPacientes.length === 0 ? (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center' }}>No se encontraron pacientes.</td>
                        </tr>
                    ) : (
                        filteredPacientes.map((paciente, index) => (
                            <tr key={index}>
                                <td>{paciente.name}</td>
                                <td>{paciente.apellido}</td>
                                <td>{paciente.dni}</td>
                                <td>{paciente.genero}</td>
                                <td>{paciente.alergia}</td>
                                {/* Formateamos la fecha para mostrar solo YYYY-MM-DD */}
                                <td>{new Date(paciente.fecha).toISOString().split('T')[0]}</td>
                                <td>{paciente.direccion}</td>
                                <td>{paciente.telefono}</td>
                                <td>{paciente.email}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};


export default MostrarPacientesPage;
