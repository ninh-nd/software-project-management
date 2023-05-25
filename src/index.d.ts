import { PaletteOptions as MuiPaletteOptions } from "@mui/material/styles/createPalette";
declare module "@mui/material/styles" {
  interface PaletteOptions extends MuiPaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}
