import './App.css'
import {Routes,Route,useNavigate} from "react-router"
import { Layout } from "./pages/Layout.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { ExplorePage } from "./pages/ExplorePage.jsx"
import { PlaylistPage } from "./pages/PlaylistPage.jsx"
import { LibraryPage } from "./pages/LibraryPage.jsx"
import { CreatePage } from "./pages/CreatePage.jsx"
import { SignUpPage } from "./pages/SignUpPage.jsx"
import { LoginPage } from "./pages/LoginPage.jsx"
import { useState,useEffect } from "react"
import axios from "axios"

function App() {
  const [currentUserName, setCurrentUserName] = useState(null);
  const navigate = useNavigate();
    useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }
    axios.get("http://localhost:3000/api/users/stayloggedin", {headers: { Authorization: `Bearer ${token}` }})
    .then((response) => {
        setCurrentUserName({ username: response.data.username })
    })
    .catch(() => {
        setCurrentUserName(null)
    })
  }, [])

  return (
    <>
      <Routes>
        <Route element={<Layout currentUserName={currentUserName} />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="playlist/:playlistId" element={<PlaylistPage />} />
        </Route>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage setCurrentUserName={setCurrentUserName} />} />
      </Routes>
    </>
  )
}

export default App
