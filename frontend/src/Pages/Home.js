import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox1";

const Home = () => {
  return (
    <div style={{ padding: "20px", height: "100vh", display: "flex" }}>
      <Sidebar />
      <ChatBox />
    </div>
  );
};

export default Home;