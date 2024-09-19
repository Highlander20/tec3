const express = require('express');
const app = express();
const port = 3000
const routes = require('./api/endPoints')
const cors = require('cors');

/*
app.get('/', (req, res) => {
    res.send('HELLO HIGHLANDER')
})
*/

 /*
app.get('/ping', (req, res) => {
    res.send('HELLO PING')
})
*/

app.use(express.json());

app.use(express.urlencoded ({ extended: true }));

app.use(cors({
    //Modificar el puerto de acuerdo a la compilacion http://localhost:5173
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"]
}));

app.use('/', routes);

/*
app.get('/register', (req, res) => {
    res.send('HELLO HORA DE REGISTRAR')
})
*/


app.listen(port, () => {
    console.log(`Servidor conectado al puerto ${port}`)
})