import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0077B6", // Deep blue
    },
    secondary: {
      main: "#00B4D8", // Aqua tone
    },
    background: {
      default: "#F6F9FC", // light background
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h5: { fontWeight: 600 },
    h6: { fontWeight: 500 },
  },
});

export default theme;
