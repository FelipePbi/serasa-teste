import { faker } from '@faker-js/faker';

import { maskCpf } from '../helpers/formatters';
import { IForm } from '../pages/Registration/components/Modal';
import { CROPS_PLANTED } from './crops_planted';
import { BRAZIL_STATES } from './states';

const MOCK_DATA: IForm[] = [];

while (MOCK_DATA.length <= 10) {
  const areaTotal = +faker.finance.amount(5000, 10000);
  const areaVegetacao = +faker.finance.amount(100, 2000);

  MOCK_DATA.push({
    id: MOCK_DATA.length + 1,
    nomeDoProdutor: faker.name.findName().toUpperCase(),
    nomeDaFazenda: faker.company.companyName().toUpperCase(),
    cpfCnpj: maskCpf(faker.random.numeric(11)),
    cidade: faker.address.cityName().toUpperCase(),
    estado: faker.helpers.arrayElement(Object.keys(BRAZIL_STATES)),
    areaTotal,
    areaAgricultavel: +areaTotal - +areaVegetacao,
    areaVegetacao,
    culturas_plantadas: faker.helpers.arrayElements(CROPS_PLANTED),
  });
}

export default MOCK_DATA;
