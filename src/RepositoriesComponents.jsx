import Home from './page/Home';
import Help from './page/Help';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function repositorie() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/help" element={<Help/>} />
      </Routes>
    </Router>
  );
}

export default repositorie;
