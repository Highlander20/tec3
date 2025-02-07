import { useState, useEffect } from 'react';
import './tratastilos.css';

const TratamientosPage = ({ onBack }) => {
    const [formData, setFormData] = useState({
        idPaciente: '',
        diente: [],
        tratamiento: '',
        fecha: '',
        observacion: '',
        costototal: ''
    });
    const [registerSuccessfull, setRegisterSuccessfull] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPacientes, setFilteredPacientes] = useState([]);

    // Cargar pacientes al montar el componente
    useEffect(() => {
        fetch('http://localhost:3000/mostrarPaciente')
            .then(response => response.json())
            .then(data => {
                setPacientes(data);
            })
            .catch(error => console.log('Error al obtener los pacientes:', error));
        
        const success = localStorage.getItem('registerSuccessfull');
        if (success === 'true') {
            setRegisterSuccessfull(true);
        }
    }, []);

    // Filtrar pacientes al cambiar el término de búsqueda
    useEffect(() => {
        const results = pacientes.filter((paciente) =>
            `${paciente.name} ${paciente.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPacientes(results);
    }, [searchTerm, pacientes]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setFormData({ ...formData, idPaciente: "" });
    };

    const handleSelectPaciente = (paciente) => {
        setFormData({ ...formData, idPaciente: paciente.id });
        setSearchTerm(`${paciente.name} ${paciente.apellido}`);
        setFilteredPacientes([]);
    };

    const handleToothClick = (index) => {
        const dientesSeleccionados = formData.diente.includes(index)
            ? formData.diente.filter(diente => diente !== index)
            : [...formData.diente, index];
        setFormData({ ...formData, diente: dientesSeleccionados });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const dataToSend = { ...formData, diente: formData.diente.join(",") };
        fetch('http://localhost:3000/tratamiento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(result => {
            if (result.MessageEvent === 'Tratamiento registrado exitosamente en la BD.') {
                setRegisterSuccessfull(true);
                localStorage.setItem('registerSuccessfull', 'true');
                setFormData({
                    idPaciente: '',
                    diente: [],
                    tratamiento: '',
                    fecha: '',
                    observacion: '',
                    costototal: ''
                });
            } else {
                setRegisterSuccessfull(false);
            }            
        })
        .catch(error => console.log(error));
    };

    return (
        <div className="tratamientos-page">
            <button className="back-button10" onClick={onBack}>Regresar</button>

            {registerSuccessfull}

            <div className="content">
                <div className="teeth-diagram">
                    <h1>Seleccione los Dientes</h1>
                    <div className="teeth-grid">
                        <div className="quadrant">
                            {/* Dientes del 18 al 11 */}
                            {Array.from({ length: 8 }, (_, i) => (
                                <div
                                    key={i}
                                    className={`tooth ${formData.diente.includes(18 - i) ? 'selected' : ''}`}
                                    onClick={() => handleToothClick(18 - i)}
                                >
                                    {18 - i}
                                </div>
                            ))}
                            {/* Dientes del 48 al 41 */}
                            {Array.from({ length: 8 }, (_, i) => (
                                <div
                                    key={i}
                                    className={`tooth ${formData.diente.includes(48 - i) ? 'selected' : ''}`}
                                    onClick={() => handleToothClick(48 - i)}
                                >
                                    {48 - i}
                                </div>
                            ))}
                        </div>
                        <div className="quadrant">
                            {/* Dientes del 21 al 28 */}
                            {Array.from({ length: 8 }, (_, i) => (
                                <div
                                    key={i}
                                    className={`tooth ${formData.diente.includes(i + 20) ? 'selected' : ''}`}
                                    onClick={() => handleToothClick(i + 20)}
                                >
                                    {i + 21}
                                </div>
                            ))}
                            {/* Dientes del 31 al 38 */}
                            {Array.from({ length: 8 }, (_, i) => (
                                <div
                                    key={i}
                                    className={`tooth ${formData.diente.includes(i + 30) ? 'selected' : ''}`}
                                    onClick={() => handleToothClick(i + 30)}
                                >
                                    {i + 31}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <form className="header-content1" onSubmit={handleRegister}>
                    <h1>Registro de Tratamiento</h1>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="idPaciente">Paciente:</label>
                            <input
                                type="text"
                                id="idPaciente"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Buscar paciente..."
                                required
                            />
                            {searchTerm && filteredPacientes.length > 0 && (
                                <ul className="patient-list">
                                    {filteredPacientes.map((paciente) => (
                                        <li
                                            key={paciente.id}
                                            onClick={() => handleSelectPaciente(paciente)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {paciente.name} {paciente.apellido}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="idTratamiento">Tratamiento:</label>
                            <select 
                                name="tratamiento" 
                                id="tratamiento" 
                                required
                                value={formData.tratamiento}
                                onChange={handleInputChange}
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
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha:</label>
                            <input 
                                type="date" 
                                name="fecha" 
                                id="fecha" 
                                required 
                                autoComplete="off"
                                value={formData.fecha}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="observacion">Observacion:</label>
                            <input 
                                type="text" 
                                name="observacion" 
                                id="observacion" 
                                required 
                                autoComplete="off"
                                value={formData.observacion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="costototal">Costo Total:</label>
                            <input 
                                type="number" 
                                name="costototal" 
                                id="costototal" 
                                required 
                                autoComplete="off"
                                value={formData.costototal}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button type="submit">Registrar Tratamiento</button>
                </form>
            </div>
        </div>
    );
};

export default TratamientosPage;
