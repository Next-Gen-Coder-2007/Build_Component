import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages//Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/register' element = {<Register/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/:chatId" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;