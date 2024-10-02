import { ThemeProvider } from './assets/props/ThemeContext';
import Repositories from './RepositoriesComponents';
import './ThemeContext.css'

function App() {
  return (
    <ThemeProvider>
      <Repositories />
    </ThemeProvider>
  );
}

export default App;
