import './pa.css';
import React from 'react';

const PacientesPage = ({ onBack }) => {
    return (
        <div className="header-container">

            <img 
                src="./src/img/register.jpg" 
                alt="Clínica Dental Vilafamés" 
                className="header-image" 
            />

            <form className="header-content">

                {/* Botón de regresar */}
                <button className="back-button" onClick={onBack}>
                    Regresar
                </button>

                <h1>Nuevo Registro Pacientes</h1>

                <div className='input-group'>
                    <input type='text' name='name' id='name' placeholder='Ingrese su nombre' required autoComplete='off'/>
                    <label htmlFor='name'></label>
                </div>
                <div className='input-group'>
                    <input type='text' name='apellido' id='apellido' placeholder='Ingrese su apellido' required autoComplete='off'/>
                    <label htmlFor='apellido'></label>
                </div>
                <div className='input-group'>
                    <input type='text' name='edad' id='edad' placeholder='Ingrese su edad' required autoComplete='off'/>
                    <label htmlFor='edad'></label>
                </div>
                <div className='input-group'>
                    <input type='text' name='sexo' id='sexo' placeholder='Ingrese su genero' required autoComplete='off'/>
                    <label htmlFor='sexo'></label>
                </div>
                <div className='input-group'>
                    <input type='text' name='telefono' id='telefono' placeholder='Ingrese su telefono' required autoComplete='off'/>
                    <label htmlFor='telefono'></label>
                </div>

                

                <p><a href="#">Forgot Your Password?</a></p> 

                
                <button className='button-container'>Registrarse</button>


            </form>
 
        </div>
    );
};

export default PacientesPage;
