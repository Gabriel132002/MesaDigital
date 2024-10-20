import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import SideBar from './SideBar';

function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleClose = () => {
    setIsSideBarOpen(false);
  };
  return (
    <div>
      <header>
        <button id="side-button" onClick={toggleSideBar}>
          <FaBars size={30} />
        </button>
        {isSideBarOpen && <SideBar onClose={handleClose} />}
      </header>

      <div>aaaaaaaaaaaaaaaaaaaaaa</div>
    </div>
  );
}

export default Home;
