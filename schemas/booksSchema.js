import Joi from "joi";

export const booksSchema = Joi.object({
  title: Joi.string().required().min(3),
  year: Joi.number().required(),
  author: Joi.string().required(),
  rating: Joi.number().required(),
});
