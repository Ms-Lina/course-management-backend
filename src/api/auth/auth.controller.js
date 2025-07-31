const authService = require('./auth.service');

const registerUser = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: "User created", userId: user.id });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Email already in use.' });
        }
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const result = await authService.login(req.body.email, req.body.password);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };