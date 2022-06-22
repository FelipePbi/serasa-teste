export const maskCpf = (value: string) => {
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
};

export const maskCnpj = (value: string) => {
  return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
};

export const removeMask = (text: string) => {
  // eslint-disable-next-line no-useless-escape
  return text.replace(/(\.|\/|\-)/g, '');
};
