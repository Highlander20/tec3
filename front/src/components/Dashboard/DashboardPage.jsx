import './DashboardPage.css';
//import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import React, { useState, useEffect } from 'react';
import Login from "../Login/LoginPage.jsx";
import PacientesPage from "../Pacientes/PacientesPage"; // Importamos la página de pacientes
import TratamientosPage from "../Tratamientos/TratamientosPage.jsx"; // Importamos la página de tratamientos
import CitasPage from "../Citas/CitasPage.jsx"; // Importamos la página de Citas
import RegisterPage from '../Register/RegisterPage.jsx';

const DashboardPage = () => {

    const [currentPage, setCurrentPage] = useState('dashboard'); // Estado para manejar la navegación
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Estado que determina si el usuario está logueado
    const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
    
          
    useEffect(() => {
        // Recuperamos el username desde localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);


    
    const handleButtonClick = () => {
        window.open('https://www.youtube.com/watch?v=qPV6EJrSTAk&pp=ygUNZGllbnRlcyBzYW5vcw%3D%3D', '_blank');
    };


    // Función para manejar el clic en el botón de logout
    //const handleButtonLogout = () => {
    //    localStorage.removeItem('token'); // Elimina el token o datos de sesión
    //    navigate('/loginPage'); // Redirige al usuario a la página de login
    //};  


    // Función para manejar el clic en el botón de logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina el token o datos de sesión
        localStorage.removeItem('username'); // Elimina el nombre de usuario del localStorage (opcional)
        setIsLoggedIn(false); // Cambia el estado para indicar que el usuario no está logueado
    };


    
    // Si el usuario no está logueado, mostramos el componente Login
    if (!isLoggedIn) {
        return <Login />;
    }


    // Función para cambiar a la página de pacientes
    const goToPacientes = () => {
        setCurrentPage('pacientes'); // Actualiza el estado a "pacientes"
    };


    // Si el estado de la página es "pacientes", mostramos la página de Pacientes
    if (currentPage === 'pacientes') {
        return <PacientesPage />;
    }



    // Función para cambiar a la página de tratamientos
    const goToTratamientos = () => {
        setCurrentPage('tratamientos'); // Actualiza el estado a "tratamientos"
    };


    // Si el estado de la página es "tratamientos", mostramos la página de tratamientos
    if (currentPage === 'tratamientos') {
        return <TratamientosPage />;
    }


    // Función para cambiar a la página de citas
    const goToCitas = () => {
        setCurrentPage('citas'); // Actualiza el estado a "citas"
    };


    // Si el estado de la página es "citas", mostramos la página de citas
    if (currentPage === 'citas') {
        return <CitasPage />;
    }



    // Función para cambiar a la página de register
    const goToRegister = () => {
        setCurrentPage('register'); // Actualiza el estado a "register"
    };


    // Si el estado de la página es "register", mostramos la página de register
    if (currentPage === 'register') {
        return <RegisterPage />;
    }

 
    
      return (
        <>
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">
                    <img src="./src/img/logo.jpg" alt="Logo Clínica" className="logo-image" />
                </div>
                <ul className="nav-links">
                    <li className="nav-item home"><a onClick={goToPacientes} href="#pacientes">Pacientes</a></li>
                    <li className="nav-item services"><a onClick={goToTratamientos} href="#tratamientos">Tratamientos</a></li>
                    <li className="nav-item contact"><a onClick={goToCitas} href="#citas">Citas</a></li>
                    <li className="nav-item about"><a onClick={goToRegister} href="#register">Registrarse</a></li>
                </ul>

                <div className="user-info">
                    <span className="username">Bienvenido, {username}</span>
                    <button className="logout-btn" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>

            </nav>

            {/* Header Container */}
            <div className="header-container">
                <img 
                    src="./src/img/foto.jpg" 
                    alt="Clínica Dental Vilafamés" 
                    className="header-image" 
                />
                <div className="header-content">
                    <h1>Tu clínica dental de familia</h1>
                    <p>En Pucallpa y alrededores</p>

                    {/* Botón que redirige a YouTube al hacer clic */}
                    <button 
                        className="video-consultation-btn" 
                        onClick={handleButtonClick}
                    >
                        Vídeo-consulta
                    </button>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;