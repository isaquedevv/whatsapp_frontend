const express = require('express');
const authRoute = require('./routes/auth.route.js');

const APP = express();
APP.use(express.json());
APP.use(authRoute);

const PORT = 3306;
const SERVER = "localhost"
const MSG = `Servidor Online em ${SERVER}:${PORT}`

APP.listen(PORT, () => console.log(MSG));