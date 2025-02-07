const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController.js');
const { login } = require('../controllers/loginController.js');
const { register } = require('../controllers/registerController.js');
const { paciente } = require('../controllers/pacienteController.js');
const { tratamiento } = require('../controllers/tratamientoController.js');
const { mostrarPaciente } = require('../controllers/mostrarController.js');
const { listarTratamientos } = require('../controllers/listarTratamientoController.js');
const { cita } = require('../controllers/citasController.js');
const { listarCitas } = require('../controllers/listarCitasController.js');
const { historia } = require('../controllers/historiasController.js');
const { listarHistorias } = require('../controllers/listarHistoriaController.js');
const { pago } = require('../controllers/pagoController.js');
const { listarPagos } = require('../controllers/listarPagoController.js');
const { eliminarPago } = require('../controllers/eliminarPagoController.js');

router.get('/ping', ping);

router.post('/login', login);

router.post('/register', register);

router.post('/paciente', paciente);

router.post('/tratamiento', tratamiento);

router.get('/mostrarPaciente', mostrarPaciente);

router.get('/listarTratamientos', listarTratamientos);

router.get('/listarCitas', listarCitas);

router.post('/cita', cita);

router.post('/historia', historia);

router.get('/listarHistorias', listarHistorias);

router.put('/pago', pago);

router.get('/listarPagos', listarPagos);

router.delete('/eliminarPago/:idPaciente', eliminarPago);

module.exports = router;