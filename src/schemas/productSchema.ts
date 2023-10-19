
import * as Joi from 'joi';

export const productSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    imgURL: Joi.string()
});