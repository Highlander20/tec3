import { useState, useEffect } from 'react';
import './listahistoria.css';

const ListaHistoriasPage = ({ onBack }) => {
    const [historias, setHistorias] = useState([]);
    const [pagos, setPagos] = useState([]); // Estado para almacenar los pagos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHistoria, setSelectedHistoria] = useState(null);

    useEffect(() => {
        // Obtener historias clínicas
        fetch('http://localhost:3000/listarHistorias')
            .then((response) => response.json())
            .then((data) => {
                setHistorias(data.historias);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error al cargar las historias');
                setLoading(false);
            });

        // Obtener pagos (tratamientos)
        fetch('http://localhost:3000/listarPagos')
            .then((response) => response.json())
            .then((data) => {
                setPagos(data.pagos);
            })
            .catch((error) => {
                console.error('Error al cargar los pagos:', error);
            });
    }, []);

    if (loading) {
        return <div>Cargando historias...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const filteredHistorias = historias.filter((historia) =>
        historia.pacienteNombre.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (historia) => {
        const tratamientosPaciente = pagos.filter((pago) => pago.idPaciente === historia.idPaciente);
        setSelectedHistoria({ ...historia, tratamientos: tratamientosPaciente });
    };

    const handleCloseModal = () => {
        setSelectedHistoria(null);
    };

    return (
        <div>
            <button className="back-button33" onClick={onBack}>
                Regresar
            </button>

            <h1>Listado de Historias Clínicas</h1>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por paciente..."
                    className="search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button">
                    <i className="fa fa-search"></i>
                </button>
            </div>

            {filteredHistorias.length === 0 ? (
                <p>No hay historias registradas.</p>
            ) : (
                <table className="historias-table">
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Fecha de Registro</th>
                            <th>Nota</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistorias.map((historia) => (
                            <tr key={historia.idPaciente} onClick={() => handleRowClick(historia)}>
                                <td>{historia.pacienteNombre}</td>
                                <td>{new Date(historia.fecharegistro).toISOString().split('T')[0]}</td>
                                <td>{historia.nota}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal para mostrar la información del paciente seleccionado */}
            {selectedHistoria && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Detalles del Paciente</h2>
                        <p><strong>Paciente:</strong> {selectedHistoria.pacienteNombre}</p>
                        <p><strong>Fecha de Registro:</strong> {new Date(selectedHistoria.fecharegistro).toISOString().split('T')[0]}</p>
                        <h3>Tratamientos</h3>
                        {selectedHistoria.tratamientos.length > 0 ? (
                            selectedHistoria.tratamientos.map((tratamiento, index) => (
                                <div key={index} className="tratamiento-info">
                                    <p><strong>Tratamiento:</strong> {tratamiento.tratamiento}</p>
                                    <p><strong>Diente:</strong> {tratamiento.diente}</p>
                                    <p><strong>Observación:</strong> {tratamiento.observacion}</p>
                                    <p><strong>Fecha:</strong> {new Date(tratamiento.fecha).toISOString().split('T')[0]}</p>
                                    <p><strong>Total del Tratamiento:</strong> {tratamiento.costototal}</p>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p>No hay tratamientos registrados para este paciente.</p>
                        )}
                        <button className="modal-button" onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaHistoriasPage;
