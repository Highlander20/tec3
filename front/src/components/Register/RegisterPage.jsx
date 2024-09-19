import React from 'react';
import './re.css';


const RegisterPage = ({ onBack }) => {

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

                <h1>Nuevo Registro</h1>

                <div className='input-group'>
                    <input type='text' name='name' id='name' placeholder='Ingrese su nombre' required autoComplete='off'/>
                    <label htmlFor='name'></label>
                </div>

                <div className='input-group'>
                    <input type='email' name='email' id='email' placeholder='Ingrese su email' required autoComplete='off'/>
                    <label htmlFor='email'></label>
                </div>

                <div className='input-group'>
                    <input type='password' name='password' id='password' placeholder='Ingrese su contraseña' required autoComplete='off'/>
                    <label htmlFor='password'></label>
                </div>

                <p><a href="#">Forgot Your Password?</a></p> 

                
                <button className='button-container'>Registrarse</button>


            </form>
 
        </div>
    );

};




export default RegisterPage;



