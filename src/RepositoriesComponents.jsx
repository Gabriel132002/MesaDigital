import Backoffice from './page/backoffice/Backoffice';
import Help from './page/Help';
import Settings from './page/Settings';
import Home from './page/Home';
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
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/backoffice/help" element={<Help />} />
        <Route path="/backoffice/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default repositorie;
