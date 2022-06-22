import { Container } from '@mui/system';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store';
import ThemeProvider from './styles';
import CustomTabs from './tabs';

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <ThemeProvider>
        <Container>
          <CustomTabs />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
