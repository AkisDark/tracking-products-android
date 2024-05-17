import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

export const COLORS = {
    background: "#fefdf8",
    primary: "#000000",
    secondary: "#39B68D",
    tertiary: "#263238",
    search: "#FF7754",
    white: "#FFFFFF",
    gray: "#F0F5FA",
    black: "#32343E"
}

export const SIZES = {
    // GLOBAL SIZES
    base: 8,
    font: 14,
    radius: 30,
    padding: 8,
    padding2: 12,
    padding3: 16,
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
  

    // FONTS SIZES
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    // APP DIMENSIONS
    width,
    height
}

export const FONTS = {
    largeTitle: { fontFamily: "cairo", fontSize: SIZES.largeTitle, lineHeight: 55},
    h1: { fontFamily: "cairo", fontSize: SIZES.h1, lineHeight: 36},
    h2: { fontFamily: "cairo", fontSize: SIZES.h2, lineHeight: 30},
    h3: { fontFamily: "cairo", fontSize: SIZES.h3, lineHeight: 22},
    h4: { fontFamily: "cairo", fontSize: SIZES.h4, lineHeight: 20},
    body1: { fontFamily: "cairo", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "cairo", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "cairo", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "cairo", fontSize: SIZES.body4, lineHeight: 20}

}

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme