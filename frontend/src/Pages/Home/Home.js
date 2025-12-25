import Sidebar from "../../Components/Home/Sidebar/Sidebar";
import ChatBox from "../../Components/Home/ChatBox/ChatBox";

const Home = () => {
  return (
    <div style={{ padding: "20px", height: "100vh", display: "flex" }}>
      <Sidebar />
      <ChatBox />
    </div>
  );
};

export default Home;