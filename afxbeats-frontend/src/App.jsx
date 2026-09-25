import './App.css'
import {Routes,Route} from "react-router"
import { Layout } from "./pages/Layout.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { ExplorePage } from "./pages/ExplorePage.jsx"
import { PlaylistPage } from "./pages/PlaylistPage.jsx"
import { LibraryPage } from "./pages/LibraryPage.jsx"
import { CreatePage } from "./pages/CreatePage.jsx"
import { SignUpPage } from "./pages/SignUpPage.jsx"
import { LoginPage } from "./pages/LoginPage.jsx"
import { useState } from "react"

function App() {
  const [currentUserName, setCurrentUserName] = useState(null);

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
