import Backoffice from './page/backoffice/Backoffice';
import Help from './page/Help';
import Settings from './page/Settings';
import Home from './page/Home';
import MenuConfig from './page/backoffice/menuConfig/MenuConfig';
import Order from './page/backoffice/Sales/Order.jsx';
import NewOrder from './page/backoffice/sales/NewOrder';
import OrderDetails from './page/backoffice/sales/OrderDetails';
import NewRequest from './page/backoffice/sales/NewRequest';
import CloseOrder from './page/backoffice/sales/CloseOrder'; // Nova tela de fechamento
import Stock from './page/backoffice/stock/Stock';
import Main from './page/backoffice/admin/Main';
import User from './page/backoffice/admin/User';
import Activity from './page/backoffice/admin/Activity';
import Financial from './page/backoffice/admin/Financial';
import NewUser from './page/backoffice/admin/NewUser';
import Auth from './page/Authentication/Auth';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Management from './page/backoffice/stock/Management.jsx';

function repositories() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/backoffice/help" element={<Help />} />
        <Route path="/backoffice/settings" element={<Settings />} />
        <Route path="/backoffice/menu" element={<MenuConfig />} />

        <Route path="/backoffice/sales" element={<Order />} />
        <Route path="/backoffice/sales/neworder" element={<NewOrder />} />
        <Route path="/backoffice/sales/orderdetails/:orderId" element={<OrderDetails />} />
        <Route path="/backoffice/sales/newrequest/:orderId" element={<NewRequest />} />
        <Route path="/backoffice/sales/closeorder/:orderId" element={<CloseOrder />} />

        <Route path="/backoffice/stock" element={<Stock />} />
        <Route path="/backoffice/gerenciamento" element={<Management />} />

        <Route path="/backoffice/admin/main" element={<Main />} />
        <Route path="/backoffice/admin/user" element={<User />} />
        <Route path="/backoffice/admin/activity" element={<Activity />} />
        <Route path="/backoffice/admin/financial" element={<Financial />} />
        <Route path="/backoffice/admin/newuser" element={<NewUser />} />

        {/* Autenticação */}
        <Route path="/authentication/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default repositories;
