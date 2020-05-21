import * as React from 'react';
import ThemeProvider from 'ui/styleguide/Wrapper';
import '../../styles/social-icons.css';
import { Router } from './Router';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};

export default App;
