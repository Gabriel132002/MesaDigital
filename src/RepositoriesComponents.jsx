import Home from './page/Home';
import Help from './page/Help';
import Settings from './page/Settings';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function repositorie() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default repositorie;
