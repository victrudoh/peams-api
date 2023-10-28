module.exports = function (schema) {
  return (req, res, next) => {
    const body = req.body;
    const { error, value } = schema.validate(body);
    req.body = value;
    if (error) return res.status(400).send({ error: error.details[0].message });
    next();
  };
};
