import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: string;
    buttonTextColor: string;
    backgroundColor: string;
    windowColor: string;
    borderColorLight: string;
    borderColorDark: string;
    accent: string;
    hover: string;
    facebook: string;
    error: string;
  }
}
