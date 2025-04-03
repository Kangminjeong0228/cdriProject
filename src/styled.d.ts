import "styled-components";
import { Theme } from "./style/Theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}