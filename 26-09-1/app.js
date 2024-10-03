const express = require('express');
const app = express();
const { getProductById, getProductsByPartialName } = require('./db');

// Rota para buscar produto por ID
app.get('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao conectar ao BD' });
    }
});

// Rota para buscar produtos por parte do nome
app.get('/produtos/nome/:partialName', async (req, res) => {
    const { partialName } = req.params;
    try {
        const products = await getProductsByPartialName(partialName);
        if (products.length > 0) {
            res.json(products);
        } else {
            res.status(404).json({ message: 'Nenhum produto encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao conectar ao BD' });
    }
});

module.exports = app;
