const supertest = require('supertest');
const request = supertest('http://localhost:8080');
const expect = require('chai').expect;

let productId = '';

describe("[Suite productos]Test de api /productos con chai y supertest", function() {
    it('Metodo GET, debería devolver un array con los productos guardados', async function() {
        const response = await request.get(`/productos`);

        expect(response.status).to.eql(200);
        expect(Array.isArray(response.body)).to.eql(true);
    });


    it('Metodo POST, debería devolver un objeto con el nuevo producto guardado', async function() {
        const response = await request.post(`/productos`).send({
            nombre: "Pendrive 8gb",
            categoria: "Componentes",
            stock: 25,
            precio: 900
        });

        productId = response.body._id;

        expect(response.status).to.eql(200);
        expect(response.body.nombre).to.eql("Pendrive 8gb");
        expect(response.body.categoria).to.eql("Componentes");
        expect(response.body.stock).to.eql(25);
        expect(response.body.precio).to.eql(900);
    });


    it('Metodo PUT, debería devolver un objeto con el producto modificado', async function() {
        const response = await request.put(`/productos/${productId}`).send({
            nombre: "Pendrive 8gb",
            categoria: "Componentes",
            stock: 12,
            precio: 850
        });


        expect(response.status).to.eql(200);
        expect(response.body.nombre).to.eql("Pendrive 8gb");
        expect(response.body.categoria).to.eql("Componentes");
        expect(response.body.stock).to.eql(12);
        expect(response.body.precio).to.eql(850);
    });


    it('Metodo DELETE, debería devolver el id del producto eliminado', async function() {
        const response = await request.delete(`/productos/${productId}`);

        expect(response.status).to.eql(200);
        expect(response.body._id).to.eql(productId);
    });
});