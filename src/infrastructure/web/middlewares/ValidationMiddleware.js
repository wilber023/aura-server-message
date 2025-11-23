// Middleware de validación y sanitización universal
module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: error.details.map(d => d.message)
    });
  }
  // Limpieza básica: trim y normalización
  Object.keys(value).forEach(key => {
    if (typeof value[key] === 'string') {
      value[key] = value[key].trim();
    }
  });
  req.body = value;
  next();
};
