import { useState } from 'react';
import './login.css';
import DashboardPage from '../Dashboard/DashboardPage';


const Login = () => {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loginSuccessfull, setLoginSuccessfull] = useState(false);

    const handdleLogin = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password 
        };

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(result=>{
            //Si la respuesta es afirmativa nos devuelve un token
            console.log(result.token)

            if(result.token){
                //Seteamos de forma global en el localStorage 
                localStorage.setItem('token', result.token)
                localStorage.setItem('username', username); // Guardamos el username en localStorage
                console.log(`Usuario ${username} ha iniciado sesión`); // Mensaje en la consola
                setLoginSuccessfull(true); //como la respuesta es afirmativa seteamos un estado en true
            } else {
                setLoginSuccessfull(false);
            }            
        })
        .catch(error=>{
            console.log(error)
        })
    }


    return (
        //Cuando es true nos lleva a DashboardPage
        <>{loginSuccessfull ? <DashboardPage />: 
            <div className="container">
                
                
            <form>
                <h1>Arte Dental - Dr. Emerson Santa Cruz - Odontologia General </h1>
                <label>Usuario</label>
                <input onChange={(event)=>{setUsername(event.target.value)}} type="text" placeholder='Nombre de usuario'></input>
                <label>Contraseña</label>
                <input onChange={(event)=>{setPassword(event.target.value)}} type="password" placeholder='Contraseña'></input>
                <button type="submit" onClick={handdleLogin}>Login</button>
                
            </form>
            <div className="image-section">

                <img src="./src/img/logov1.jpeg" class="small-image"/>
                
            </div>
            
        </div>
        
        }</>
    );
}

export default Login;