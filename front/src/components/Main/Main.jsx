import Login from "../Login/LoginPage.jsx";
import DashboardPage from "../Dashboard/DashboardPage.jsx"

function parseJwt(token) {
    if (!token) {
        return null; // Si el token es null o undefined, retornamos null
    }

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error al parsear el token:", error);
        return null; // Si el token está mal formado o ocurre un error, retornamos null
    }
}

// Verificamos si el token existe y es válido
let tokenExistAndStillValido = false; // Valor por defecto

const token = localStorage.getItem('token');

if (token) {
    const parsedToken = parseJwt(token);

    // Verificamos si el token fue correctamente parseado y si su tiempo de expiración es válido
    if (parsedToken && parsedToken.exp * 1000 > Date.now()) {
        tokenExistAndStillValido = true;
    }
}

const Main = () => {
    return (
        <>
            {tokenExistAndStillValido ? <DashboardPage /> : <Login />}
        </>
    );
};

export default Main;
