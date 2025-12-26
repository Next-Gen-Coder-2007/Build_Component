import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useEffect } from "react";
import Chat from "./Pages/Chat";
import ProfilePage from "./Pages/ProfilePage";

function AuthWrapper() {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch("http://build-component.onrender.com/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        navigate("/login", { replace: true });
      }
    };
    if (["/register", '/login'].includes(window.location.pathname)) return;
    verifyUser();
  }, [navigate]);
}

function App() {
  return (
    <Router>
      <AuthWrapper />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/:chatId" element={<Chat />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
