import React from 'react';
import { primary } from 'ui/themes';
import { ThemeProvider as StyledTheme } from 'styled-components';

const ThemeProvider = ({ children, theme = primary }) => {
  return <StyledTheme theme={theme}>{children}</StyledTheme>;
};

export default ThemeProvider;
