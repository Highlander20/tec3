import { useState, useEffect } from 'react';
import './lista.css'; // Asegúrate de tener los estilos adecuados

const ListaPagosPage = ({ onBack }) => {
    const [pagos, setPagos] = useState([]); // Estado para almacenar los pagos
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado para manejar errores
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

    // Obtener los pagos cuando el componente se monta
    useEffect(() => {
        fetch('http://localhost:3000/listarPagos') // Cambia la URL según tu API
            .then((response) => response.json())
            .then((data) => {
                setPagos(data.pagos); // Guardar los pagos obtenidos
                setLoading(false); // Desactivar el estado de carga
            })
            .catch((error) => {
                setError('Error al cargar los pagos');
                setLoading(false); // Desactivar el estado de carga
            });
    }, []);

    if (loading) {
        return <div>Cargando pagos...</div>; // Mensaje de carga
    }

    if (error) {
        return <div>{error}</div>; // Mensaje de error
    }

    // Filtrar pagos según el término de búsqueda
    const filteredPagos = pagos.filter((pago) =>
        pago.motivo.toLowerCase().includes(searchTerm.toLowerCase()) || 
        pago.idPaciente.toString().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Botón de regresar */}
            <button className="back-button7" onClick={onBack}>
                Regresar
            </button>

            <h1>Listado de Pagos</h1>

            {/* Campo de búsqueda */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por ID de paciente o motivo..."
                    className="search-input"
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
                />
                <button className="search-button">
                    <i className="fa fa-search"></i> {/* Ícono de lupa */}
                </button>
            </div>

            {filteredPagos.length === 0 ? (
                <p>No hay pagos registrados.</p>
            ) : (
                <table className="pagos-table">
                    <thead>
                        <tr>
                            <th>ID Paciente</th>
                            <th>Tratamiento</th>
                            <th>Pago</th>
                            <th>Deuda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPagos.map((pago) => (
                            <tr key={pago.id}>
                                <td>{pago.idPaciente}</td> {/* Mostrar ID del paciente */}
                                <td>{pago.idTratamiento}</td> {/* Mostrar ID del tratamiento */}
                                <td>{pago.pago}</td> {/* Mostrar monto pagado */}
                                <td>{pago.deuda}</td> {/* Mostrar deuda pendiente */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListaPagosPage;
