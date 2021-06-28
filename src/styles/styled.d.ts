import 'styled-components';
import lightTheme from './lightTheme';

export type Theme = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}