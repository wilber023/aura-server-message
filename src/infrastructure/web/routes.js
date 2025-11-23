// src/infrastructure/web/routes.js
const express = require('express');
const groupController = require('./controllers/GroupController');
const authMiddleware = require('./middlewares/AuthMiddleware'); // JWT Auth para HTTP
const validation = require('./middlewares/ValidationMiddleware');
const { groupSchema } = require('../../shared/validators/groupValidator');
const { messageSchema } = require('../../shared/validators/messageValidator');
const { userSchema } = require('../../shared/validators/userValidator');

module.exports = (app) => {
    const router = express.Router();
    
    // Middleware de autenticación global (simulación de JWT Auth)
    router.use(authMiddleware); 

    // --- Rutas de GRUPOS (CRUD Completo) ---
    // POST /groups - Crear grupo/comunidad
    router.post('/groups', validation(groupSchema), groupController.createGroup);
    

    // GET /groups/:groupId/messages - Obtener historial
    router.get('/groups/:groupId/messages', groupController.getGroupMessages);

    // POST /groups/:groupId/messages - Enviar mensaje (con validación)
    const messageController = require('./controllers/MessageController');
    router.post('/groups/:groupId/messages', validation(messageSchema), messageController.sendMessage);

    // POST /groups/:groupId/members - Agregar usuario a grupo
    router.post('/groups/:groupId/members', groupController.addMember);

    // DELETE /groups/:groupId/members/:userId - Remover usuario de grupo
    router.delete('/groups/:groupId/members/:userId', groupController.removeMember);


    // POST /users - Crear usuario (con validación)
    const userController = require('./controllers/UserController');
    router.post('/users', validation(userSchema), userController.createUser);

    // GET /users/:userId/conversations - Obtener conversaciones (Simulación)
    router.get('/users/:userId/conversations', (req, res) => res.status(200).send({ message: "Conversations list placeholder" }));

    app.use('/', router);
};