import Sidebar from "./Sidebar/Sidebar"
import ChatBox from "./ChatBox/ChatBox"

const AppLayout = () => {
  return (
    <div style={{ padding: "20px", height: "100vh", display: "flex" }}>
      <Sidebar/>
      <ChatBox/>
    </div>
  )
}

export default AppLayout