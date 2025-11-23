// Simulación de envío de mensaje
exports.sendMessage = async (req, res) => {
    // Aquí deberías validar y guardar el mensaje en la base de datos
    res.status(201).json({ message: 'Mensaje enviado (mock)' });
};
