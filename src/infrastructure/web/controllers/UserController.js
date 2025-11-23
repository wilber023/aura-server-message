// src/infrastructure/web/controllers/UserController.js
const { v4: uuidv4 } = require('uuid');

// Simulación de creación de usuario (debería delegar a un caso de uso real)
exports.createUser = async (req, res) => {
    try {
        // Aquí normalmente llamarías a un caso de uso de aplicación
        const { username, email } = req.body;
        // Simulación de persistencia
        const user = {
            id: uuidv4(),
            username,
            email,
            createdAt: new Date().toISOString(),
        };
        return res.status(201).json({ user });
    } catch (err) {
        return res.status(500).json({ error: 'Error creating user' });
    }
};
