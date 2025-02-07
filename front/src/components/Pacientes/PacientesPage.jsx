import { useState, useEffect } from 'react';
import './pa.css';

const PacientesPage = ({ onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        apellido: '',
        dni: '',
        genero: '',
        alergia: '',
        fecha: '',
        direccion: '',
        telefono: '',
        email: ''
    });
    const [registerSuccessfull, setRegisterSuccessfull] = useState(false);

    useEffect(() => {
        const success = localStorage.getItem('registerSuccessfull');
        if (success === 'true') {
            setRegisterSuccessfull(true);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Validación para permitir solo letras y espacios en los campos "name", "apellido" y "alergia"
        if ((name === 'name' || name === 'apellido' || name === 'alergia') && /[^a-zA-Z\s]/.test(value)) {
            return; // Salir si el valor contiene caracteres no permitidos
        }

        // Validación para permitir solo números en "dni" y "telefono"
        if ((name === 'dni' || name === 'telefono') && /[^0-9]/.test(value)) {
            return; // Salir si el valor contiene caracteres no numéricos
        }

        setFormData({ ...formData, [name]: value });
    };
    

    const handleRegister = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/paciente', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.MessageEvent === 'Paciente registrado exitosamente.') {
                setRegisterSuccessfull(true);
                localStorage.setItem('registerSuccessfull', 'true');
                setFormData({
                    name: '',
                    apellido: '',
                    dni: '',
                    genero: '',
                    alergia: '',
                    fecha: '',
                    direccion: '',
                    telefono: '',
                    email: ''
                });
                console.log("Campos limpios:", formData);
            } else {
                setRegisterSuccessfull(false);
            }            
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <div>
            <button className="back-button3" onClick={onBack}>
                Regresar
            </button>

            <form className="header-content1" onSubmit={handleRegister}>
                <h1>Registro de Pacientes</h1>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Ingrese su nombre" 
                            required 
                            autoComplete="off"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido:</label>
                        <input 
                            type="text" 
                            name="apellido" 
                            id="apellido" 
                            placeholder="Ingrese su apellido" 
                            required 
                            autoComplete="off"
                            value={formData.apellido}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dni">DNI:</label>
                        <input 
                            type="text" 
                            name="dni" 
                            id="dni" 
                            placeholder="Ingrese su DNI" 
                            required 
                            autoComplete="off"
                            value={formData.dni}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="alergia">Alergia:</label>
                        <input 
                            type="text" 
                            name="alergia" 
                            id="alergia" 
                            placeholder="Ingrese su alergia" 
                            required 
                            autoComplete="off"
                            value={formData.alergia}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="direccion">Dirección:</label>
                        <input 
                            type="text" 
                            name="direccion" 
                            id="direccion" 
                            placeholder="Ingrese su dirección" 
                            required 
                            autoComplete="off"
                            value={formData.direccion}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono:</label>
                        <input 
                            type="text" 
                            name="telefono" 
                            id="telefono" 
                            placeholder="Ingrese su teléfono" 
                            required 
                            autoComplete="off"
                            value={formData.telefono}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Ingrese su email" 
                            required 
                            autoComplete="off"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="genero">Género:</label>
                        <select 
                            name="genero" 
                            id="genero" 
                            required 
                            value={formData.genero}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccione su género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fecha">Fecha de Nacimiento:</label>
                        <input 
                            type="date" 
                            name="fecha" 
                            id="fecha" 
                            required 
                            value={formData.fecha}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit">Registrar</button>
                </div>
            </form>
        </div>
    );
};

export default PacientesPage;
