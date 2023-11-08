import Joi from "joi";

const userRegistrationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(10)
    .regex(/^[A-Z][a-zA-Z]*$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(5)
    .regex(/.*[0-9].*/)
    .required(),
  money_balance: Joi.number().min(0).max(1000).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export { userRegistrationSchema, userLoginSchema };
