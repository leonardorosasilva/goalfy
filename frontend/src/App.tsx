import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './shared/styles/GlobalStyles';
import { theme } from './shared/styles/theme';
import { ClientProvider } from './presentation/contexts/ClientContext';
import { ClientRegisterPage } from './presentation/pages/ClientRegisterPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ClientProvider>
        <ClientRegisterPage />
      </ClientProvider>
    </ThemeProvider>
  );
}

export default App;
