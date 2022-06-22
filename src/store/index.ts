import { configureStore } from '@reduxjs/toolkit';

import produtorRuralReducer from './produtorRuralReducer';

export default configureStore({
  reducer: {
    produtorRural: produtorRuralReducer,
  },
});
