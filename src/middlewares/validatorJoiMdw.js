const validation = (schema) => {

  let joiValidation = (req, res, next) => {
    let { error } = schema.validate(req.body, {abortEarly: false});
    if (error) {
      return res.status(400).json({errors: error.details.map(err => err.message) });
    } else {
      next();
    }
  };
  return joiValidation;
};

module.exports = validation;
