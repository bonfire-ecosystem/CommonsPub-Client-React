import * as styledComponents from 'styled-components';

export interface MoodleThemeInterface {
  breakpoints: string[];
  colors: {
    app: string;
    appInverse: string;
    primary: string;
    secondary: string;
    tertiary: string;
    positive: string;
    negative: string;
    warning: string;
    lightest: string;
    lighter: string;
    light: string;
    mediumlight: string;
    medium: string;
    mediumdark: string;
    dark: string;
    darker: string;
    darkest: string;

    border: string;
  };
  text: {
    subhead: {
      fontFamily: string;
      fontSize: string;
      color: string;
      textTransform: string;
      letterSpacing: string;
      fontWeight: string;
    };
    suptitle: {
      fontFamily: string;
      fontSize: string;
      color: string;
      textTransform: string;
      letterSpacing: string;
      fontWeight: string;
    };
    link: {
      fontFamily: string;
      fontSize: string;
      color: string;
      letterSpacing: string;
      fontWeight: string;
    };
    text: {
      fontFamily: string;
      fontSize: string;
      color: string;
      letterSpacing: string;
      fontWeight: string;
    };
    heading: {
      fontFamily: string;
      fontSize: string;
      color: string;
      letterSpacing: string;
      fontWeight: string;
    };
  };
  variants: {
    negative: {
      bg: string;
      color: string;
    };
    positive: {
      bg: string;
      color: string;
    };
    warning: {
      bg: string;
      color: string;
    };
    avatar: {
      borderRadius: string;
    };
  };
  buttons: {
    primary: {
      fontWeight: string;
      borderRadius: string;
      height: string;
      px: number;
      fontSize: string;
      backgroundColor: string;
      cursor: string;
      textTransform: string;
      letterSpacing: string;
    };
    danger: {
      fontWeight: string;
      borderRadius: string;
      height: string;
      color: string;
      px: number;
      fontSize: string;
      backgroundColor: string;
      cursor: string;
      textTransform: string;
      letterSpacing: string;
    };

    outline: {
      fontWeight: string;
      borderRadius: string;
      height: string;
      px: number;
      fontSize: string;
      backgroundColor: string;
      cursor: string;
      color: string;
      textTransform: string;
      letterSpacing: string;
      border: string;
    };
  };
  space: string[];
  fontFamily: string;
}

export interface StyledThemeInterface {
  theme: MoodleThemeInterface;
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme
} = styledComponents;

export { css, createGlobalStyle, keyframes, ThemeProvider, withTheme };

export default styled;
