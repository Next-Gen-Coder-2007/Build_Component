import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Layout/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route path="/about" element={<h1>About Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;