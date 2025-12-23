import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './Components/Layout/Applayout/AppLayout';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route path="/:chatId" element={<AppLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;