import './Main.css';
import Logo from '../../../assets/images/logo.jpg';

import { FaBars, FaList, FaMoneyBill, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Main() {
  const [activeButton, setActiveButton] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const userPage = () => {
    navigate('/Backoffice/admin/user');
  };

  const activityPage = () => {
    navigate('/backoffice/admin/activity');
  };

  const financialPage = () => {
    navigate('/backoffice/admin/financial');
  };

  const handleMouseDown = (button) => {
    setActiveButton(button);
  };

  const handleMouseUp = () => {
    setActiveButton(null);
  };

  return (
    <div className="full-screen">
      <div>
        <div className="top">
          <img src={Logo} alt="Logo principal" id="logo" />
          <button id="sidebar-button">
            <FaBars />
          </button>
        </div>
        <div className="main-options">
          {location.pathname !== '/backoffice/admin/user' && (
            <button
              style={{
                backgroundColor: activeButton === 'users' ? '#FF9933' : '',
              }}
              onMouseDown={() => handleMouseDown('users')}
              onMouseUp={handleMouseUp}
              onClick={userPage}
            >
              <FaUser /> Usuários
            </button>
          )}

          {location.pathname !== '/backoffice/admin/activity' && (
            <button
              style={{
                backgroundColor: activeButton === 'activities' ? '#FF9933' : '',
              }}
              onMouseDown={() => handleMouseDown('activities')}
              onMouseUp={handleMouseUp}
              onClick={activityPage}
            >
              <FaList /> Atividades
            </button>
          )}

          {location.pathname !== '/backoffice/admin/financial' && (
            <button
              style={{
                backgroundColor: activeButton === 'sell' ? '#FF9933' : '',
              }}
              onMouseDown={() => handleMouseDown('sell')}
              onMouseUp={handleMouseUp}
              onClick={financialPage}
            >
              <FaMoneyBill /> Financeiro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
