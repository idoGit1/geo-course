import { createTheme } from "@mui/material/styles";
import { heIL } from "@mui/material/locale";

/**
 * Design tokens
 * -------------
 * Palette is drawn from cartography itself: ink used for surveyor's
 * lines, the green/tan/teal of a topographic elevation gradient, and
 * a brass accent borrowed from an old compass or drafting instrument.
 */
export const COLORS = {
  ink: "#17242E", // deep navy-charcoal, like printed map linework
  ink70: "#3E4C56",
  paper: "#F1EEE1", // aged atlas paper
  paperDark: "#E7E2CF",
  cardPaper: "#FBFAF4",
  forest: "#2F6B4F", // lowland contour green
  forestDark: "#1B3A28",
  teal: "#1F7A8C", // ocean / water bodies
  brass: "#B98A3D", // compass / drafting-instrument brass
  clay: "#A64B3B", // high-elevation brown-red, used sparingly
  slate: "#4A5D7E",
  olive: "#6B7A3A",
  line: "rgba(23,36,46,0.12)",
  red: "#D32F2F",
};

// Rotating accent per unit (1 through 6) so each unit reads as its own
// "region" on the map while staying inside one coherent family.
export const UNIT_ACCENTS = [
  COLORS.forest,
  COLORS.teal,
  COLORS.brass,
  COLORS.clay,
  COLORS.slate,
  COLORS.olive,
  COLORS.forestDark,
  COLORS.teal,
  COLORS.brass,
  COLORS.clay,
  COLORS.slate,
  COLORS.olive,
];

export const FONT_DISPLAY = "'Rubik', 'Heebo', sans-serif";
export const FONT_BODY = "'Heebo', 'Rubik', sans-serif";
export const FONT_MONO = "'Space Mono', 'Courier New', monospace";

const theme = createTheme(
  {
    direction: "rtl",
    palette: {
      mode: "light",
      primary: {
        main: COLORS.forest,
        dark: "#20492E",
        light: "#5C9179",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: COLORS.teal,
        contrastText: "#FFFFFF",
      },
      background: {
        default: COLORS.paper,
        paper: COLORS.cardPaper,
      },
      text: {
        primary: COLORS.ink,
        secondary: COLORS.ink70,
      },
      divider: COLORS.line,
      warning: {
        main: COLORS.brass,
      },
      error: {
        main: COLORS.clay,
      },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: FONT_BODY,
      h1: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 800,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 800,
        letterSpacing: "-0.01em",
      },
      h3: { fontFamily: FONT_DISPLAY, fontWeight: 700 },
      h4: { fontFamily: FONT_DISPLAY, fontWeight: 700 },
      h5: { fontFamily: FONT_DISPLAY, fontWeight: 600 },
      h6: { fontFamily: FONT_DISPLAY, fontWeight: 600 },
      button: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 600,
        textTransform: "none",
      },
      subtitle1: { fontWeight: 500 },
      body1: { lineHeight: 1.85 },
      body2: { lineHeight: 1.75 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: COLORS.paper,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: COLORS.ink,
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            paddingInline: 18,
          },
          containedPrimary: {
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            border: `1px solid ${COLORS.line}`,
            backgroundColor: COLORS.cardPaper,
            backgroundImage: "none",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontFamily: FONT_MONO,
            fontWeight: 700,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            height: 3,
            borderRadius: 3,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            border: `1px solid ${COLORS.line}`,
            borderRadius: "10px !important",
            backgroundColor: COLORS.cardPaper,
            backgroundImage: "none",
            "&:before": { display: "none" },
          },
        },
      },
    },
  },
  heIL,
);

export default theme;
