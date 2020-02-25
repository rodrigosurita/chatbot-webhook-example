const Joi = require('@hapi/joi');

const UserSchema = Joi.object({
  username: Joi.string()
    .min(2)
    .message('O nome deve possuir pelo menos 2 caracteres')
    .max(60)
    .message('O nome deve possuir no máximo 60 caracteres')
    .required(),
  useremail: Joi.string()
    .email()
    .message('O email deve ser válido')
    .required(),
  userpassword: Joi.string()
    .pattern(/^.[^\s]{5,30}$/)
    .message('Senha inválida')
    .min(8)
    .message('A senha deve possuir pelo menos 8 caracteres')
    .max(20)
    .message('A senha deve possuir no máximo 20 caracteres')
    .required(),
  isAdmin: Joi.bool().required(),
});

const LoginSchema = Joi.object({
  useremail: Joi.string()
    .email()
    .message('Insira um email válido')
    .required(),
  userpassword: Joi.string()
    .pattern(/^.[^\s]{5,30}$/)
    .message('Senha inválida')
    .min(8)
    .message('A senha deve possuir pelo menos 8 caracteres')
    .max(20)
    .message('A senha deve possuir no máximo 20 caracteres')
    .required(),
});

module.exports = {
  UserSchema,
  LoginSchema,
};
