import './DashboardPage.css';
//import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import React, { useState, useEffect } from 'react';
import Login from "../Login/LoginPage.jsx";
import PacientesPage from "../Pacientes/PacientesPage"; // Importamos la página de pacientes
import TratamientosPage from "../Tratamientos/TratamientosPage.jsx"; // Importamos la página de tratamientos
import CitasPage from "../Citas/CitasPage.jsx"; // Importamos la página de Citas
import RegisterPage from '../Register/RegisterPage.jsx';
import InfoPage from '../Informacion/InfoPage.jsx';
import MostrarPacientesPage from '../Pacientes/MostrarPacientePage.jsx';
import ListadoTratamientosPage from '../Tratamientos/ListadoTratamientosPage.jsx';
import ListaCitasPage from '../Citas/ListaCitasPage.jsx';
import HistoriaPage from '../Historias/HistoriaPage.jsx';
import PagoPacientePage from '../Balance/PagoPacientePage.jsx';
import ListaHistoriasPage from '../Historias/ListaHistoriasPage.jsx';

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
        return <PacientesPage onBack={() => setCurrentPage('dashboard')} />;
    }



    // Función para cambiar a la página de Lista pacientes
    const goToListaPacientes = () => {
        setCurrentPage('listaPacientes'); // Actualiza el estado a "pacientes"
    };


    // Si el estado de la página es "pacientes", mostramos la página de Pacientes
    if (currentPage === 'listaPacientes') {
        return <MostrarPacientesPage onBack={() => setCurrentPage('dashboard')} />;
    }



    // Función para cambiar a la página de tratamientos
    const goToTratamientos = () => {
        setCurrentPage('tratamientos'); // Actualiza el estado a "tratamientos"
    };


    // Si el estado de la página es "tratamientos", mostramos la página de tratamientos
    if (currentPage === 'tratamientos') {
        return <TratamientosPage onBack={() => setCurrentPage('dashboard')} />;
    }



      // Función para cambiar a la página de listar tratamientos
      const goToListarTratamientos = () => {
        setCurrentPage('listaTatamientos'); // Actualiza el estado a "tratamientos"
    };

    // Si el estado de la página es "listar tratamientos", mostramos la página de listar tratamientos
    if (currentPage === 'listaTatamientos') {
        return <ListadoTratamientosPage onBack={() => setCurrentPage('dashboard')} />;
    }


    // Función para cambiar a la página de Balance de Paciente
    const goToPagoPaciente = () => {
        setCurrentPage('pagopaciente'); // Actualiza el estado a "tratamientos"
    };

    // Si el estado de la página es "listar tratamientos", mostramos la página de listar tratamientos
    if (currentPage === 'pagopaciente') {
        return <PagoPacientePage onBack={() => setCurrentPage('dashboard')} />;
    }


    // Función para cambiar a la página de Historias
    const goToHistorias = () => {
        setCurrentPage('historias'); // Actualiza el estado a "historias"
    };


    // Si el estado de la página es "historias", mostramos la página de historias
    if (currentPage === 'historias') {
        return <HistoriaPage onBack={() => setCurrentPage('dashboard')} />; // Pasamos la función para volver
    }


    // Función para cambiar a la página de Lista Historias
    const goTolistaHistorias = () => {
        setCurrentPage('listahistorias'); // Actualiza el estado a "lista historias"
    };


    // Si el estado de la página es "lista historias", mostramos la página de lista historias
    if (currentPage === 'listahistorias') {
        return <ListaHistoriasPage onBack={() => setCurrentPage('dashboard')} />; // Pasamos la función para volver
    }


    // Función para cambiar a la página de citas
    const goToCitas = () => {
        setCurrentPage('citas'); // Actualiza el estado a "citas"
    };


    // Si el estado de la página es "citas", mostramos la página de citas
    if (currentPage === 'citas') {
        return <CitasPage onBack={() => setCurrentPage('dashboard')} />; // Pasamos la función para volver
    }


    // Función para cambiar a la página de Lista de citas
    const goToListaCitas = () => {
        setCurrentPage('listacitas'); // Actualiza el estado a "lista citas"
    };


    // Si el estado de la página es "citas", mostramos la página de Lista citas
    if (currentPage === 'listacitas') {
        return <ListaCitasPage onBack={() => setCurrentPage('dashboard')} />; // Pasamos la función para volver
    }



    // Función para cambiar a la página de register
    const goToRegister = () => {
        setCurrentPage('register'); // Actualiza el estado a "register"
    };


    // Si el estado de la página es "register", mostramos la página de register
    if (currentPage === 'register') {
        return <RegisterPage onBack={() => setCurrentPage('dashboard')} />;
    }


    // Función para cambiar a la página de informacion
    const goToInformacion = () => {
        setCurrentPage('informacion'); // Actualiza el estado a "register"
    };


    // Si el estado de la página es "register", mostramos la página de register
    if (currentPage === 'informacion') {
        return <InfoPage onBack={() => setCurrentPage('dashboard')} />;
    }

 
    
      return (
        <>
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">
                    <img src="./src/img/logov2.png" alt="Logo Clínica" className="logo-image" />
                </div>
                <ul className="nav-links">
                    <li className="nav-item home">
                            <a>Pacientes</a>
                        <ul className="submenu">
                            <li><a onClick={goToPacientes} href="#pacientes">Nuevo Paciente</a></li>
                            <li><a onClick={goToListaPacientes} href="#listaPacientes">Lista de Pacientes</a></li>
                        </ul>
                    </li>

                    <li className="nav-item services">
                        <a>Tratamientos</a>
                        <ul className="submenu">
                            <li><a onClick={goToTratamientos} href="#pantalladental">Pantalla Dental</a></li>
                            <li><a onClick={goToListarTratamientos} href="#listaTatamientos">Listado de Tratamiento</a></li>
                            <li><a onClick={goToPagoPaciente} href="#pagopaciente">Pago del Paciente</a></li>
                        </ul>
                    </li>

                    <li className="nav-item contact">
                        <a>Historiales</a>
                        <ul className="submenu">
                            <li><a onClick={goToHistorias} href="#historias">Nuevo Historial</a></li>
                            <li><a onClick={goTolistaHistorias} href="#listahistorias">Lista de Historiales</a></li>
                        </ul>
                    </li>

                    <li className="nav-item contact">
                        <a>Citas</a>
                        <ul className="submenu">
                            <li><a onClick={goToCitas} href="#citas">Nueva Cita</a></li>
                            <li><a onClick={goToListaCitas} href="#listacitas">Lista de Citas</a></li>
                        </ul>
                    </li>
                    <li className="nav-item about"><a onClick={goToRegister} href="#register">Registrarse</a></li>
                    <li className="nav-item about"><a onClick={goToInformacion} href="#informacion">Acerca de Nosotros</a></li>
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
                    src="./src/img/diente.jpeg" 
                    alt="Clínica Dental Vilafamés" 
                    className="header-image" 
                /> 
            </div>

            {/* Contenedor para el texto grande alineado a la izquierda */}
            <div className="text-left-container">
                <h1 className="big-left-text">¡Bienvenidos a nuestra clínica!</h1>
                <p className="location-text">En Pucallpa y alrededores</p>
            </div>
        </>
    );
};

export default DashboardPage;