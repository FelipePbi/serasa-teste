/* eslint-disable no-restricted-syntax */
import { useMemo } from 'react';

import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import Chart from 'react-google-charts';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { IForm } from '../Registration/components/Modal';

const Item = styled(Paper)`
  height: 60;
  line-height: 60px;
  padding: 0 50px;
  text-align: center;

  strong {
    display: block;
  }

  span {
    font-size: 36px;
  }
`;

export default function Dashboard() {
  const data: IForm[] = useSelector((state: any) => state.produtorRural.data);

  const totalFazendas = data.length;
  const totalHectares = useMemo(() => {
    return data.reduce((prev, current) => (prev += current.areaTotal), 0);
  }, [data]);

  const estadosData = useMemo(() => {
    const estado: any = {};
    for (const produtor of data) {
      const current = estado[produtor.estado];
      estado[produtor.estado] = current > 0 ? current + 1 : 1;
    }

    return [['Estados', 'Quantidade de fazendas por estados'], ...Object.entries(estado)];
  }, [data]);

  const culturasData = useMemo(() => {
    const culturas: any = {};
    for (const produtor of data) {
      for (const cultura of produtor.culturas_plantadas) {
        const current = culturas[cultura];
        culturas[cultura] = current > 0 ? current + 1 : 1;
      }
    }

    return [['Culturas', 'Quantidade por culturas'], ...Object.entries(culturas)];
  }, [data]);

  const areaData = useMemo(() => {
    const areas = {
      agricultável: 0,
      vegetação: 0,
    };
    for (const produtor of data) {
      areas.agricultável += +produtor.areaAgricultavel;
      areas.vegetação += +produtor.areaVegetacao;
    }

    return [['Area agricultável vs vegetação', 'Quantidade por áreas'], ...Object.entries(areas)];
  }, [data]);

  const options = {
    legend: 'none',
    pieSliceText: 'label',
    backgroundColor: '#191920',
    titleTextStyle: {
      color: '#ffffff',
      fontSize: 16,
    },
  };

  return (
    <>
      <Box display="flex" justifyContent="space-evenly">
        <Item elevation={3}>
          <strong>Total de fazendas (quantidade)</strong>
          <span>{totalFazendas}</span>
        </Item>
        <Item elevation={3}>
          <strong>Total de fazendas (hectares)</strong>
          <span>{totalHectares.toFixed(2)} m²</span>
        </Item>
      </Box>
      <Box display="flex" justifyContent="space-evenly" mt={3}>
        <Chart
          chartType="PieChart"
          data={estadosData}
          options={{
            ...options,
            title: 'Estados',
          }}
          width="100%"
          height="300px"
        />
        <Chart
          chartType="PieChart"
          data={culturasData}
          options={{
            ...options,
            title: 'Culturas',
          }}
          width="100%"
          height="300px"
        />
        <Chart
          chartType="PieChart"
          data={areaData}
          options={{
            ...options,
            title: 'Área agricultável x Área vegetação',
          }}
          width="100%"
          height="300px"
        />
      </Box>
    </>
  );
}
