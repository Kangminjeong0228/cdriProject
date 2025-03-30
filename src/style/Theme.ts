export interface Theme {
    Background: {
        primary: string;
        red: string;
        gray: string;
        lightGray: string;
        white: string;
        black: string;
    };
    Color: {
        primary: string;
        secondary: string;
        subtitle: string;
    };
}
export const theme: Theme = {
    Background: {
        primary: "#4880EE",
        red: "#E84118",
        gray: "#DADADA",
        lightGray: "#F2F4F6",
        white: "#FFFFFF",
        black: "#222222",
    },
    Color: {
        primary: "#353C49",
        secondary: "#6D7582",
        subtitle: "#8D94A0",
    }
}


export default theme;