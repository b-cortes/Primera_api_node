const express = require('express');
const app = express();

 // Ruta básica
 app.get('/', (req, res) => {
 res.send('Hola Mundo');
 });

 // Iniciar el servidor en el puerto 3000
 app.listen(3000, () => {
 console.log('Servidor escuchando en http://localhost:3000');
 });
