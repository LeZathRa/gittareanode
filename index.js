const express = require('express');
const app = express();

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Datos de ejemplo para clientes y productos
const clientes = [
    { id: 1, nombre: 'Cliente 1', email: 'cliente1@example.com' },
    { id: 2, nombre: 'Cliente 2', email: 'cliente2@example.com' },
    { id: 3, nombre: 'Cliente 3', email: 'cliente3@example.com' }
];

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a la página principal');
});

app.get('/clientes', (req, res) => {
    // Mostrar los primeros 3 clientes
    res.json(clientes.slice(0, 3));
});

app.get('/productos', (req, res) => {
    // Mostrar los primeros 3 productos
    res.json(productos.slice(0, 3));
});

// Permitir peticiones POST, PUT y DELETE para clientes
app.post('/clientes', (req, res) => {
    const nuevoCliente = req.body;
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

app.put('/clientes/:id', (req, res) => {
    const idCliente = req.params.id;
    const clienteActualizado = req.body;
    const index = clientes.findIndex(cliente => cliente.id === parseInt(idCliente));
    if (index !== -1) {
        clientes[index] = clienteActualizado;
        res.json(clienteActualizado);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

app.delete('/clientes/:id', (req, res) => {
    const idCliente = req.params.id;
    const index = clientes.findIndex(cliente => cliente.id === parseInt(idCliente));
    if (index !== -1) {
        clientes.splice(index, 1);
        res.send('Cliente eliminado correctamente');
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
