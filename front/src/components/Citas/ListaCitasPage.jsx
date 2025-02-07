import { useState, useEffect } from 'react';
import './lista.css';

const ListaCitasPage = ({ onBack }) => {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda

    
    // Obtener las citas cuando el componente se monta
    useEffect(() => {
        fetch('http://localhost:3000/listarCitas') // Cambia la URL según tu API
            .then((response) => response.json())
            .then((data) => {
                setCitas(data.citas); // Guardar las citas obtenidas
                setLoading(false); // Desactivar el estado de carga
            })
            .catch((error) => {
                setError('Error al cargar las citas');
                setLoading(false); // Desactivar el estado de carga
            });
    }, []);

    if (loading) {
        return <div>Cargando citas...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Filtrar citas según el término de búsqueda
    const filteredCitas = citas.filter((cita) =>
        cita.motivo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Botón de regresar */}
            <button className="back-button7" onClick={onBack}>
                Regresar
            </button>

            <h1>Listado de Citas</h1>

            {/* Campo de búsqueda */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por motivo de cita..."
                    className="search-input"
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
                />
                <button className="search-button">
                    <i className="fa fa-search"></i> {/* Ícono de lupa */}
                </button>
            </div>

            {filteredCitas.length === 0 ? (
                <p>No hay citas registradas.</p>
            ) : (
                <table className="tratamientos-table">
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Motivo</th>
                            <th>Doctor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCitas.map((cita) => (
                            <tr key={cita.id}>
                                <td>{cita.pacienteNombre}</td> {/* Mostrar nombre del paciente */}
                                {/* Formateamos la fecha para mostrar solo YYYY-MM-DD */}
                                <td>{new Date(cita.fecha).toISOString().split('T')[0]}</td>
                                <td>{cita.hora}</td>
                                <td>{cita.motivo}</td>
                                <td>{cita.doctor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListaCitasPage;
