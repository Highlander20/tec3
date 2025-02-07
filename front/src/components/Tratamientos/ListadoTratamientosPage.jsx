import { useState, useEffect } from 'react';
import './listado.css';

const ListadoTratamientosPage = ({ onBack }) => {
    const [pagos, setPagos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/listarPagos')
            .then((response) => response.json())
            .then((data) => {
                setPagos(data.pagos);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error al cargar los pagos');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Cargando pagos...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const filteredPagos = pagos.filter((pago) =>
        pago.pacienteNombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <button className="back-button33" onClick={onBack}>
                Regresar
            </button>

            <h1>Listado de Tratamientos</h1>

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

            {filteredPagos.length === 0 ? (
                <p>No hay pagos registrados.</p>
            ) : (
                <table className="pagos-table">
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Diente</th>
                            <th>Tratamiento</th>
                            <th>Fecha</th>
                            <th>Observación</th>
                            <th>Total del Tratamiento</th>
                            <th>Pago</th>
                            <th>Deuda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPagos.map((pago) => (
                            <tr key={pago.idPaciente}>
                                <td onClick={() => handlePacienteClick(pago)}>
                                    {pago.pacienteNombre}
                                </td>
                                <td>{pago.diente}</td>
                                <td>{pago.tratamiento}</td>
                                {/* Formateamos la fecha para mostrar solo YYYY-MM-DD */}
                                <td>{new Date(pago.fecha).toISOString().split('T')[0]}</td>
                                <td>{pago.observacion}</td>
                                <td>{pago.costototal}</td>
                                <td>{pago.pago}</td>
                                <td>{pago.deuda}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListadoTratamientosPage;
