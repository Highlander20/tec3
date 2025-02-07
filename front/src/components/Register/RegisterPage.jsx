import { useState } from 'react';
import './register.css';
import DashboardPage from '../Dashboard/DashboardPage';

const RegisterPage = ({ onBack }) => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [registerSuccessfull, setRegisterSuccessfull] = useState(false); // Cambiamos el estado para el registro

    const handleRegister = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password 
        };

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // Verificamos si la respuesta contiene un token
            console.log(result);

            if (result.token) {
                // Guardamos el token y el nombre de usuario en localStorage
                localStorage.setItem('token', result.token);
                localStorage.setItem('username', username);
                setRegisterSuccessfull(true); // Si el registro es exitoso, cambiamos el estado a true
            } else {
                setRegisterSuccessfull(false); // Si falla, lo dejamos en false
            }            
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        // Redirigimos a DashboardPage si el registro fue exitoso
        <>{registerSuccessfull ? <DashboardPage /> : 
            <div className="container">
                <button className="back-button1" onClick={ onBack }>
                    Regresar
                </button>

                <form>
                    <h1>Registro de Usuario</h1>
                    <label>Usuario</label>
                    <input 
                        onChange={(event) => setUsername(event.target.value)} 
                        type="text" 
                        placeholder="Nombre de usuario"
                    />
                    <label>Contraseña</label>
                    <input 
                        onChange={(event) => setPassword(event.target.value)} 
                        type="password" 
                        placeholder="Contraseña"
                    />
                    <button type="submit" onClick={handleRegister}>Registrarse</button>
                </form>
                <div className="image-section">
                    <img src="./src/img/logov1.jpeg" className="small-image" alt="Logo"/>
                </div>
            </div>
        }</>
    );
}

export default RegisterPage;
