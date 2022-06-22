/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
import joi from 'joi';

function validaCpfCnpj(val: string, helpers: any) {
  if (val.length === 14) {
    let cpf = val.replace(/\./g, '');
    cpf = cpf.replace('-', '');

    console.log('cpf', cpf);
    if (
      !cpf ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    )
      return helpers.error('any.invalid');
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return helpers.error('any.invalid');
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return helpers.error('any.invalid');
    return true;
  }

  let cnpj = val.replace(/\./g, '');
  cnpj = cnpj.replace('-', '');

  if (
    !cnpj ||
    cnpj.length !== 14 ||
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  )
    return helpers.error('any.invalid');
  let tamanho = cnpj.length - 2;
  let numeros: any = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado: any = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== digitos.charAt(0)) return helpers.error('any.invalid');
  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== digitos.charAt(1)) return helpers.error('any.invalid');
  return true;
}

export const hasErrorProdutorRural = (form: any) => {
  const schema = joi.object().keys({
    id: joi.any().allow(),
    nomeDoProdutor: joi
      .string()
      .trim()
      .min(3)
      .max(256)
      .required()
      .label('Nome do produtor')
      .messages({
        'string.min': `Deve ter no mínimo {#limit} caracteres`,
        'string.empty': `Campo obrigatório`,
      }),
    nomeDaFazenda: joi
      .string()
      .trim()
      .min(3)
      .max(256)
      .required()
      .label('Nome da fazenda')
      .messages({
        'string.min': `Deve ter no mínimo {#limit} caracteres`,
        'string.empty': `Campo obrigatório`,
      }),
    cpfCnpj: joi.string().trim().min(11).max(18).custom(validaCpfCnpj).label('CPF/CNPJ').messages({
      'string.min': `Deve ter no mínimo {#limit} caracteres`,
      'string.empty': `Campo obrigatório`,
      'any.invalid': `Valor informado é inválido`,
    }),
    cidade: joi.string().trim().min(3).max(50).required().label('Cidade').messages({
      'string.min': `Deve ter no mínimo {#limit} caracteres`,
      'string.empty': `Campo obrigatório`,
    }),
    estado: joi.string().required().label('Estado'),
    areaTotal: joi.number().positive().min(1).required().label('Área total').messages({
      'number.min': `Campo obrigatório`,
      'number.positive': `Campo obrigatório`,
    }),
    areaAgricultavel: joi
      .number()
      .positive()
      .min(1)
      .required()
      .label('Área agricultável')
      .messages({
        'number.min': `Campo obrigatório`,

        'number.positive': `Campo obrigatório`,
      }),
    areaVegetacao: joi.number().positive().min(1).required().label('Área vegetação').messages({
      'number.min': `Campo obrigatório`,
      'number.positive': `Campo obrigatório`,
    }),
    culturas_plantadas: joi.array().required().min(1).label('Culturas plantadas').messages({
      'array.min': `Campo obrigatório`,
    }),
  });

  const errors = schema.validate(form, { abortEarly: false });

  const errors_formatted = errors.error?.details
    .map((err) => `${err.context?.label}: ${err.message}`)
    .join('\n');

  return errors_formatted;
};
