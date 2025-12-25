import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import Chat from "./pages/Chat";
import ProfilePage from "./pages/ProfilePage";

function AuthWrapper() {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/verify", {
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
