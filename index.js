const express = require('express');
const app = express();

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

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
    res.json(clientes);
});

app.get('/productos', (req, res) => {
    res.json(productos);
});

//  POST, PUT y DELETE para clientes
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
//  POST, PUT y DELETE para PRODUCTOS

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
    const idProducto = parseInt(req.params.id);
    const productoActualizado = req.body;
    const index = productos.findIndex(producto => producto.id === idProducto);
    if (index !== -1) {
        productos[index] = productoActualizado;
        res.json(productoActualizado);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});
app.delete('/productos/:id', (req, res) => {
    const idProducto = parseInt(req.params.id);
    const index = productos.findIndex(producto => producto.id === idProducto);
    if (index !== -1) {
        productos.splice(index, 1);
        res.send('Producto eliminado correctamente');
    } else {
        res.status(404).send('Producto no encontrado');
    }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
