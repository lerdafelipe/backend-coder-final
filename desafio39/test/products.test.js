const assert = require('assert');
const axios = require('axios')

const API_URL = 'http://localhost:8080';
const URL_PRODUCTS = `${API_URL}/productos`;
let productId = '';

describe("Test de api metodo GET, ruta productos", function() {
    it('debería devolver un array con los productos guardados', async function() {
        const response = await axios.get(URL_PRODUCTS);

        assert.strictEqual(Array.isArray(response.data), true)
    })
});

describe("Test de api metodo POST, ruta productos", function() {
    it('debería devolver un objeto con el nuevo producto guardado', async function() {
        const response = await axios.post(`${URL_PRODUCTS}`,{
            nombre: "Pendrive 8gb",
            categoria: "Componentes",
            stock: 25,
            precio: 900
        });

        productId = response.data._id;

        assert.strictEqual(response.data.nombre, "Pendrive 8gb");
        assert.strictEqual(response.data.categoria, "Componentes");
        assert.strictEqual(response.data.stock, 25);
        assert.strictEqual(response.data.precio, 900);
    })
});

describe("Test de api metodo PUT, ruta productos", function() {
    it('debería devolver un objeto con el producto modificado', async function() {
        const response = await axios.put(`${URL_PRODUCTS}/${productId}`,{
            nombre: "Pendrive 8gb",
            categoria: "Componentes",
            stock: 12,
            precio: 850
        });


        assert.strictEqual(response.data.nombre, "Pendrive 8gb");
        assert.strictEqual(response.data.categoria, "Componentes");
        assert.strictEqual(response.data.stock, 12);
        assert.strictEqual(response.data.precio, 850);
        assert.strictEqual(response.data._id, productId);
    })
});

describe("Test de api metodo POST, ruta productos", function() {
    it('debería devolver el id del producto eliminado', async function() {
        const response = await axios.delete(`${URL_PRODUCTS}/${productId}`);


        assert.strictEqual(response.data._id, productId);
    })
});