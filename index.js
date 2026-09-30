const express = require('express');
const app = express();

// Permite leer JSON en el cuerpo de las peticiones (necesario para POST)
app.use(express.json());

// "Base de datos" en memoria
let alumnos = [
  { id: 1, nombre: 'Ana', edad: 20 },
  { id: 2, nombre: 'Carlos', edad: 21 },
  { id: 3, nombre: 'Lucia', edad: 19 }
];
let siguienteId = 4;

// GET: devuelve todos los alumnos
app.get('/alumnos', (req, res) => {
  res.json(alumnos);
});

// POST: da de alta un nuevo alumno
app.post('/alumnos', (req, res) => {
  const { nombre, edad } = req.body;

  if (!nombre || !edad) {
    return res.status(400).json({ error: 'Faltan datos: nombre y edad son obligatorios' });
  }

  const nuevoAlumno = { id: siguienteId++, nombre, edad };
  alumnos.push(nuevoAlumno);
  res.status(201).json(nuevoAlumno);
});

// DELETE: borra un alumno por su id
app.delete('/alumnos/:id', (req, res) => {
  const id = Number(req.params.id);
  const existe = alumnos.some(a => a.id === id);

  if (!existe) {
    return res.status(404).json({ error: `No existe ningún alumno con id ${id}` });
  }

  alumnos = alumnos.filter(a => a.id !== id);
  res.json({ mensaje: `Alumno con id ${id} eliminado` });
});

app.listen(3000, () => console.log('API en http://localhost:3000'));
