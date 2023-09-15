import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: "#E4C9FF" },
      secondary: { main: "#F9F9F9" },
      success: { light: "#B2EDD2", main: "#309E4E" },
      error: { main: "#C63C3C" },
    },
  }),
  { factor: 4 }
);
