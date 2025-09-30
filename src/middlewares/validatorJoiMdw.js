
const validation = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      return res.status(400).json({
        errors: error.details.map(err => err.message),
      });
    }

    // Sanitiza: reemplaza por valores validados (ej: defaults de Joi)
    req[property] = value;
    next();
  };
};

module.exports = validation;
