const { User } = require('../../models');
const jwt = require('jsonwebtoken');

const register = async (userData) => User.create(userData);

const login = async (email, password) => {
    const user = await User.unscoped().findOne({ where: { email } });
    if (!user || !(await user.isValidPassword(password))) {
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return { user: user.toJSON(), token };
};

module.exports = { register, login };