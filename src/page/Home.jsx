import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import SideBar from './SideBar';
import useFetchData from '../service/Connection';

function Home() {
  const { data, error, loading } = useFetchData(
    'http://localhost:8080/api/message'
  );

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
  const handleClose = () => setIsSideBarOpen(false);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <header>
        <button id="side-button" onClick={toggleSideBar}>
          <FaBars size={30} />
        </button>
        {isSideBarOpen && <SideBar onClose={handleClose} />}
      </header>

      <main>
        <h1>Dados do Backend:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </div>
  );
}

export default Home;
