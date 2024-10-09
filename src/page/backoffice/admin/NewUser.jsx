import { useState } from 'react';
import Logo from '../../../assets/images/logo.jpg';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../SideBar';

function NewUser() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const navigate = useNavigate();

  const previousPage = () => {
    navigate('/backoffice/admin/user');
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const handleClose = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div className="full-screen">
      <header>
        <button type="button" id="return-header" onClick={previousPage}>
          <FaArrowLeft />
        </button>
        <img src={Logo} alt="Logo principal" id="logo" />
        <button id="side-button" onClick={toggleSideBar}>
          <FaBars size={30} />
        </button>
        {isSideBarOpen && <SideBar onClose={handleClose} />}
      </header>
    </div>
  );
}

export default NewUser;
