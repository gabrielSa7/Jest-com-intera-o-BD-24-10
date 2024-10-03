const { getProductById, getProductsByPartialName, connection } = require('./db');

describe('Testes para a tabela de produtos', () => {
    beforeAll(async () => {
        await connection.query('CREATE TABLE IF NOT EXISTS produtos (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255), preco DECIMAL(10, 2), descricao VARCHAR(255))');
        await connection.query("INSERT INTO produtos (nome, preco, descricao) VALUES ('Celular', 999.99, 'Celular com 128GB de memória')");
        await connection.query("INSERT INTO produtos (nome, preco, descricao) VALUES ('Notebook', 1999.99, 'Notebook com 16GB de RAM e 512GB SSD')");
    });

    test('deve retornar o produto correto pelo ID', async () => {
        const product = await getProductById(1);
        expect(product).toHaveProperty('nome', 'Celular');
        expect(product).toHaveProperty('preco', '999.99');
    });

    test('vai retornar undefined se o produto não existir', async () => {
        const product = await getProductById(999);
        expect(product).toBeUndefined();
    });

    test('deve retornar produtos com parte do nome "Cel"', async () => {
        const products = await getProductsByPartialName('Cel');
        expect(products.length).toBeGreaterThan(0);
        expect(products[0]).toHaveProperty('nome', 'Celular');
    });

    test('não deve permitir mais de 255 caracteres no campo descrição', async () => {
        const longDescription = 'a'.repeat(256);
        try {
            await connection.query("INSERT INTO produtos (nome, preco, descricao) VALUES ('Tablet', 299.99, ?)", [longDescription]);
        } catch (error) {
            expect(error.code).toBe('ER_DATA_TOO_LONG');
        }
    });
});
