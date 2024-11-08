import { ThemeProvider } from './assets/props/ThemeContext';
import Repositories from './RepositoriesComponents';
import './ThemeContext.css';
import './i18n.jsx';

function App() {
  return (
    <ThemeProvider>
      <Repositories />
    </ThemeProvider>
  );
}

export default App;
