const { sequelize, User } = require('../src/models');

describe('Database Models', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    test('Unit Test 1: User model should hash password', async () => {
        const user = await User.create({
            name: 'Test User', email: 'test@example.com', password: 'password123', role: 'Facilitator'
        });
        expect(user.password).not.toBe('password123');
        expect(await user.isValidPassword('password123')).toBe(true);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});