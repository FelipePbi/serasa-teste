import { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';

import { Delete, OpenModal } from '../../../../store/produtorRuralReducer';
import { IForm } from '../Modal';

function Row(props: { row: IForm }) {
  const dispatch = useDispatch();

  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.nomeDoProdutor}
        </TableCell>
        <TableCell>{row.nomeDaFazenda}</TableCell>
        <TableCell>{row.cpfCnpj}</TableCell>
        <TableCell>{`${row.cidade} / ${row.estado}`}</TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => dispatch(OpenModal(row))}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => dispatch(Delete(row))}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Culturas plantadas</TableCell>
                    <TableCell align="right">Área Agricultável (hec)</TableCell>
                    <TableCell align="right">Área Vegetação (hec)</TableCell>
                    <TableCell align="right">Área Total (hec)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.culturas_plantadas.join(', ')}</TableCell>
                    <TableCell align="right">{row.areaAgricultavel}m²</TableCell>
                    <TableCell align="right">{row.areaVegetacao}m²</TableCell>
                    <TableCell align="right">{row.areaTotal}m²</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;
