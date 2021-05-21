import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string,
    textHoverSize: string,
    secondary: string,
    primaryAuthorNameColor: string,
    secondaryAuthorNameColor: string
    primaryMessageBackground: string,
    secondaryMessageBackground: string,
    primaryMessageTextColor: string,
    secondaryMessageTextColor: string,
    buttonBackground: string,
    buttonTextColor: string,
    infoColor: string
  }
}