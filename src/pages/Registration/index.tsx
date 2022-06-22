import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

import AddModal, { IForm } from './components/Modal';
import Row from './components/Row';

export default function Registration() {
  const data: IForm[] = useSelector((state: any) => state.produtorRural.data);

  return (
    <>
      <Box mb={2}>
        <AddModal />
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nome Produtor</TableCell>
              <TableCell>Nome Fazenda</TableCell>
              <TableCell>CPF/CNPJ</TableCell>
              <TableCell>Cidade/Estado</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Row key={row.nomeDoProdutor} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
