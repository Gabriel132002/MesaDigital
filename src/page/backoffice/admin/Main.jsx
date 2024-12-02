import './Main.css';
import Logo from '../../../assets/images/logo.jpg';

import { FaBars, FaList, FaMoneyBill, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../SideBar';

function Main() {
  const [activeButton, setActiveButton] = useState(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const handleClose = () => {
    setIsSideBarOpen(false);
  };

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
    <div id="admin-bg">
      <div>
        <div className="top">
          <img src={Logo} alt="Logo principal" id="main-logo" />
          <button id="sidebar-button" onClick={toggleSideBar}>
            <FaBars />
          </button>
          {isSideBarOpen && <SideBar onClose={handleClose} />}
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
