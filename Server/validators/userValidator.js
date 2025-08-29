const Joi = require("joi");


exports.createUserValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().integer().min(1).required(),
    gender: Joi.string().valid("Male", "Female").required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};


exports.updateUserValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
    username: Joi.string().alphanum().min(3).max(30),
    firstName: Joi.string(),
    lastName: Joi.string(),
    age: Joi.number().integer().min(1),
    gender: Joi.string().valid("Male", "Female"),
    address: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
