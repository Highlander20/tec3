import { useState, useEffect } from 'react';
import './pago.css';

const ListaPagosPage = ({ onBack }) => {
    const [pagos, setPagos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedPago, setSelectedPago] = useState(null);
    const [nuevoPago, setNuevoPago] = useState('');
    const [nuevaDeuda, setNuevaDeuda] = useState('');

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
        pago.pacienteNombre.toString().includes(searchTerm.toLowerCase())
    );

    const handlePagoClick = (pago) => {
        setSelectedPago(pago);
        setNuevoPago(pago.pago);
        setNuevaDeuda(pago.deuda);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPago(null);
        setNuevoPago('');
        setNuevaDeuda('');
    };

    const handlePagoChange = (e) => {
        const pago = parseFloat(e.target.value);
        setNuevoPago(pago);

        if (!isNaN(pago)) {
            // Calcular la nueva deuda: Total del tratamiento menos el nuevo pago
            const deudaRestante = selectedPago.costototal - pago;
            setNuevaDeuda(deudaRestante > 0 ? deudaRestante : 0); // Asegurarse que la deuda no sea negativa
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que nuevoPago y nuevaDeuda sean números no negativos
        if (isNaN(nuevoPago) || nuevoPago < 0) {
            alert('El pago debe ser un número no negativo.');
            return;
        }

        if (isNaN(nuevaDeuda) || nuevaDeuda < 0) {
            alert('La deuda debe ser un número no negativo.');
            return;
        }

        const updatedPago = {
            idPaciente: selectedPago.idPaciente,
            tratamiento: selectedPago.tratamiento,
            pago: nuevoPago,
            deuda: nuevaDeuda,
        };

        fetch('http://localhost:3000/pago', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPago),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.MessageEvent === 'Pago actualizado exitosamente en la BD.') {
                    setPagos((prevPagos) =>
                        prevPagos.map((pago) =>
                            pago.idPaciente === selectedPago.idPaciente && pago.tratamiento === selectedPago.tratamiento
                                ? { ...pago, pago: nuevoPago, deuda: nuevaDeuda }
                                : pago
                        )
                    );
                    closeModal();
                } else {
                    alert(data.MessageEvent || 'Error al actualizar el pago');
                }
            })
            .catch(() => {
                alert('Error al conectar con el servidor');
            });
    };

    const handleDeletePago = (idPaciente) => {
        fetch(`http://localhost:3000/eliminarPago/${idPaciente}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setPagos((prevPagos) => prevPagos.filter((pago) => pago.idPaciente !== idPaciente));
                } else {
                    alert('Error al eliminar el pago');
                }
            })
            .catch(() => {
                alert('Error al conectar con el servidor');
            });
    };

    return (
        <div>
            <button className="back-button33" onClick={onBack}>
                Regresar
            </button>

            <h1>Listado de Pagos</h1>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por nombre del Paciente..."
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
                            <th>Tratamiento</th>
                            <th>Total del Tratamiento</th>
                            <th>Pago</th>
                            <th>Deuda</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPagos.map((pago) => (
                            <tr key={pago.idPaciente}>
                                <td>{pago.pacienteNombre}</td>
                                <td>{pago.tratamiento}</td>
                                <td>{pago.costototal}</td>
                                <td>{pago.pago}</td>
                                <td>{pago.deuda}</td>
                                <td>
                                    <button onClick={() => handlePagoClick(pago)}>Editar</button>
                                    <button onClick={() => handleDeletePago(pago.idPaciente)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showModal && (
                <div className="modal-overlay3">
                    <div className="modal-content3">
                        <h2>Actualizar Pago y Deuda</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Nuevo Pago:
                                <input
                                    type="number"
                                    placeholder="Ingrese monto de pago"
                                    value={nuevoPago}
                                    onChange={handlePagoChange}
                                />
                            </label>
                            <label>
                                Nueva Deuda:
                                <input
                                    type="number"
                                    placeholder="Ingrese su nueva deuda"
                                    value={nuevaDeuda}
                                    onChange={(e) => setNuevaDeuda(e.target.value)}
                                />
                            </label>
                            <button type="submit">Guardar</button>
                            <button type="button" onClick={closeModal}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaPagosPage;
