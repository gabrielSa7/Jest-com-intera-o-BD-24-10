const { getUserById, connection } = require('./db');

describe('Testes para getUserById', () => {
    beforeAll(async () => {
        await connection.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))');
        await connection.query("INSERT INTO users (name, email) VALUES ('Marcos Vinicius', 'marcos@mail.com')");
        await connection.query("INSERT INTO users (name, email) VALUES ('Gabriel Santana', 'gabriel@gmail.com')");
    });

    test('deve retornar o usuário correto pelo ID', async () => {
        const user = await getUserById(1);
        expect(user).toHaveProperty('name', 'Marcos Vinicius');
        expect(user).toHaveProperty('email', 'marcos@mail.com');
    });

    test('Vai retornar undefined se o usuário não existir', async () => {
        const user = await getUserById(999);
        expect(user).toBeUndefined();
    });
});
