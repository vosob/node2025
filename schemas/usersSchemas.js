import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  favorites: Joi.array().items(Joi.string().hex().length(24)).default([]),
});
