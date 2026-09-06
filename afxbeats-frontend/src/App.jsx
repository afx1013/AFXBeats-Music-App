import './App.css'
import {Routes,Route} from "react-router"
import { Layout } from "./pages/Layout.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { ExplorePage } from "./pages/ExplorePage.jsx"
import { PlaylistPage } from "./pages/PlaylistPage.jsx"
import { LibraryPage } from "./pages/LibraryPage.jsx"
import { CreatePage } from "./pages/CreatePage.jsx"
import { SignUpPage } from "./pages/SignUpPage.jsx"
function App() {
  
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="playlist/:playlistId" element={<PlaylistPage />} />
        </Route>
        <Route path="signup" element={<SignUpPage />} />
      </Routes>
    </>
  )
}

export default App
