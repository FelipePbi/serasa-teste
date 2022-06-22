import { createSlice } from '@reduxjs/toolkit';

import MOCK_DATA from '../constants/mock_data';

export const produtorRuralSlice = createSlice({
  name: 'produtorRural',
  initialState: {
    data: MOCK_DATA,
    modalIsOpen: false,
    editProdutor: null,
  },
  reducers: {
    Add: (state: any, action: any) => {
      state.data.push({ ...action.payload, id: state.data.length + 1 });
    },
    Update: (state: any, action: any) => {
      state.data = state.data.map((produtor: any) => {
        if (produtor.id === action.payload.id) {
          return action.payload;
        }
        return produtor;
      });
    },
    Delete: (state: any, action: any) => {
      state.data = state.data.filter((produtor: any) => produtor.id !== action.payload.id);
    },
    CloseModal: (state: any) => {
      state.modalIsOpen = false;
      state.editProdutor = null;
    },
    OpenModal: (state: any, action: any) => {
      state.modalIsOpen = true;
      state.editProdutor = action.payload;
    },
  },
});

export const { Add, Delete, Update, CloseModal, OpenModal } = produtorRuralSlice.actions;

export default produtorRuralSlice.reducer;
