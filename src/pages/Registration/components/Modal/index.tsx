import { useEffect, useState } from 'react';

import {
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';

import { CROPS_PLANTED } from '../../../../constants/crops_planted';
import { MenuProps } from '../../../../constants/input_props';
import { BRAZIL_STATES } from '../../../../constants/states';
import { NumberFormatCustom } from '../../../../helpers/customInputs';
import { maskCnpj, maskCpf, removeMask } from '../../../../helpers/formatters';
import { hasErrorProdutorRural } from '../../../../helpers/validators';
import { Add, CloseModal, OpenModal, Update } from '../../../../store/produtorRuralReducer';

export interface IForm {
  id?: number;
  nomeDoProdutor: string;
  nomeDaFazenda: string;
  cpfCnpj: string;
  cidade: string;
  estado: string;
  areaTotal: number;
  areaAgricultavel: number;
  areaVegetacao: number;
  culturas_plantadas: string[];
}

const INITIAL_STATE = {
  nomeDoProdutor: '',
  nomeDaFazenda: '',
  cpfCnpj: '',
  cidade: '',
  estado: 'AC',
  areaTotal: 0,
  areaAgricultavel: 0,
  areaVegetacao: 0,
  culturas_plantadas: [],
};

const AddModal = () => {
  const dispatch = useDispatch();
  const { modalIsOpen, editProdutor } = useSelector((state: any) => state.produtorRural);

  const [form, setForm] = useState<IForm>(INITIAL_STATE);

  useEffect(() => {
    setForm(editProdutor || INITIAL_STATE);
  }, [editProdutor]);

  const formatForm = (pForm: IForm) => {
    const newForm = pForm;
    newForm.areaTotal = +newForm.areaAgricultavel + +newForm.areaVegetacao;

    const cpfCnpj = removeMask(newForm.cpfCnpj.slice(0, 18));
    newForm.cpfCnpj = cpfCnpj.length <= 11 ? maskCpf(cpfCnpj) : maskCnpj(cpfCnpj);

    return newForm;
  };

  const handleChangeCrops = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setForm({ ...form, culturas_plantadas: typeof value === 'string' ? value.split(',') : value });
  };

  const handleChange =
    (prop: keyof IForm) => (event: React.ChangeEvent<HTMLInputElement> | any) => {
      const newForm = formatForm({ ...form, [prop]: event.target.value });
      setForm(newForm);
    };

  const handleSubmit = (): any => {
    const hasErrors = hasErrorProdutorRural(form);
    if (hasErrors) {
      alert(hasErrors);
      return false;
    }

    dispatch(editProdutor ? Update(form) : Add(form));

    return dispatch(CloseModal());
  };

  return (
    <div>
      <Button variant="contained" onClick={() => dispatch(OpenModal(null))}>
        Adicionar
      </Button>
      <Dialog open={modalIsOpen} onClose={() => dispatch(CloseModal())}>
        <DialogTitle>Adicionar/Editar Produtor Rural</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nomeDoProdutor"
            onChange={handleChange('nomeDoProdutor')}
            value={form.nomeDoProdutor}
            label="Nome Produtor"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="nomeDaFazenda"
            label="Nome Fazenda"
            onChange={handleChange('nomeDaFazenda')}
            value={form.nomeDaFazenda}
            type="text"
            fullWidth
            variant="standard"
          />
          <Box display="flex" flexDirection="row">
            <TextField
              margin="dense"
              id="cpfCnpj"
              onChange={handleChange('cpfCnpj')}
              label="CPF/CNPJ"
              value={form.cpfCnpj}
              type="text"
              variant="standard"
              style={{ marginRight: 20, minWidth: 200 }}
            />
            <FormControl variant="standard" margin="dense" fullWidth>
              <InputLabel id="crops-planted-label">Culturas Plantadas</InputLabel>
              <Select
                labelId="crops-planted-label"
                id="crops-planted"
                multiple
                value={form.culturas_plantadas}
                onChange={handleChangeCrops}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {CROPS_PLANTED.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={form.culturas_plantadas.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" flexDirection="row">
            <TextField
              style={{ marginRight: 20 }}
              margin="dense"
              id="cidade"
              onChange={handleChange('cidade')}
              value={form.cidade}
              label="Cidade"
              fullWidth
              type="text"
              variant="standard"
            />
            <FormControl variant="standard" margin="dense" fullWidth>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                id="estado"
                value={form.estado}
                onChange={handleChange('estado')}
                label="Estado"
                MenuProps={MenuProps}
              >
                {Object.entries(BRAZIL_STATES).map((state) => (
                  <MenuItem key={state[0]} value={state[0]}>
                    {state[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" flexDirection="row">
            <TextField
              style={{ marginRight: 20 }}
              margin="dense"
              id="areaAgricultavel"
              label="Área Agricultável"
              fullWidth
              onChange={handleChange('areaAgricultavel')}
              type="text"
              value={form.areaAgricultavel}
              variant="standard"
              InputProps={{
                endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                inputComponent: NumberFormatCustom as any,
              }}
            />
            <TextField
              style={{ marginRight: 20 }}
              margin="dense"
              id="areaVegetacao"
              label="Área Vegetação"
              value={form.areaVegetacao}
              onChange={handleChange('areaVegetacao')}
              fullWidth
              type="text"
              variant="standard"
              InputProps={{
                endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                inputComponent: NumberFormatCustom as any,
              }}
            />
            <TextField
              margin="dense"
              id="areaTotal"
              label="Área Total"
              onChange={handleChange('areaTotal')}
              value={form.areaTotal}
              fullWidth
              disabled
              type="text"
              variant="standard"
              InputProps={{
                endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                inputComponent: NumberFormatCustom as any,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => dispatch(CloseModal())}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddModal;
