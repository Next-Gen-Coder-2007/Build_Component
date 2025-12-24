import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../Components/Home/Sidebar/Sidebar"
import ChatBox from "../Components/Home/ChatBox/ChatBox"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/verify", {
          method: "GET",
          credentials: "include",
        })

        if (!res.ok) {
          navigate("/login", { replace: true })
        }
      } catch (err) {
        navigate("/login", { replace: true })
      }
    }

    verifyUser()
  }, [navigate])

  return (
    <div style={{ padding: "20px", height: "100vh", display: "flex" }}>
      <Sidebar/>
      <ChatBox/>
    </div>
  )
}

export default Home
