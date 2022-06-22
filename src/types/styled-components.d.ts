/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-componets';

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    black: string;
    white: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
