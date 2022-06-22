import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components/macro';

import THEMES from '../constants/themes';
import { IFunctionalComponentProps } from '../types/interfaces';
import GlobalStyles from './globalStyle';

const ThemeProvider: React.FC<IFunctionalComponentProps> = ({ children }) => {
  return (
    <StyledComponentThemeProvider theme={THEMES.default}>
      {children}
      <GlobalStyles />
    </StyledComponentThemeProvider>
  );
};

export default ThemeProvider;
