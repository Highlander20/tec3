import { useState } from 'react';
//import './LoginPage.css';
import './login.css';
import DashboardPage from '../Dashboard/DashboardPage';
import qrImage from '../../img/qr1.png'; // Importamos la imagen desde la carpeta img

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
                <h2>Bienvenidos</h2>
                <label>Username</label>
                <input onChange={(event)=>{setUsername(event.target.value)}} type="text"></input>
                <label>Password</label>
                <input onChange={(event)=>{setPassword(event.target.value)}} type="password"></input>
                <button type="submit" onClick={handdleLogin}>Login</button>
                <div className="form-icons">
                    <img src={qrImage} alt="QR Code" /> {/* Aquí agregamos la imagen */}
                    <img src={qrImage} alt="QR Code" /> {/* Aquí agregamos la imagen */}
                </div>
            </form>
            <div className="image-section">
                {/* Aquí puedes agregar una imagen médica */}
            </div>
        </div>
        }</>
    );
}

export default Login;