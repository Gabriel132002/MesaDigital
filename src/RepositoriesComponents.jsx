import Backoffice from './page/backoffice/Backoffice';
import Help from './page/Help';
import Settings from './page/Settings';
import Home from './page/Home';
import Menu from './page/backoffice/Menu';
import Sales from './page/backoffice/Sales';
import Stock from './page/backoffice/Stock';
import Main from './page/backoffice/admin/Main';
import User from './page/backoffice/admin/User';
import Activity from './page/backoffice/admin/Activity';
import Financial from './page/backoffice/admin/Financial';
import NewUser from './page/backoffice/admin/NewUser';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function repositories() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/backoffice/help" element={<Help />} />
        <Route path="/backoffice/settings" element={<Settings />} />
        <Route path="/backoffice/menu" element={<Menu />} />
        <Route path="/backoffice/sales" element={<Sales />} />
        <Route path="/backoffice/stock" element={<Stock />} />
        <Route path="/backoffice/admin/main" element={<Main />} />
        <Route path="/backoffice/admin/User" element={<User />} />
        <Route path="/backoffice/admin/activity" element={<Activity />} />
        <Route path="/backoffice/admin/financial" element={<Financial />} />
        <Route path="/backoffice/admin/NewUser" element={<NewUser />} />
      </Routes>
    </Router>
  );
}

export default repositories;
