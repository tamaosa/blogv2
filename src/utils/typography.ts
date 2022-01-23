import Typography from "typography"
import "@fontsource/kosugi-maru"

const theme = {
  baseFontSize: "16px",
  baseLineHeight: 1.75,
  scaleRatio: 2,
  headerFontFamily: ["Kosugi Maru", "sans-serif"],
  bodyFontFamily: ["Kosugi Maru", "sans-serif"],
}

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
