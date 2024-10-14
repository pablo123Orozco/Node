const express = require('express');
const cors = require('cors'); // Importa cors

const app = express();

// Configura CORS para permitir solicitudes desde localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Permite este origen (el de tu frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));

app.use(express.json());

const routes = require('./rutas');
app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
