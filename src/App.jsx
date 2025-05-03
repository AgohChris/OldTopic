import Main from "./components/main"
import {Routes, Route} from "react-router-dom"
import Historique from "./components/historique"
import Profil from "./components/profil"
import Hero from "./components/hero"
function App() {

  return (
    
    <Routes>
      {/* Route principale avec layout (NavBar + Footer) */}
      <Route path="/" element={<Main />}>
        <Route index element={<Hero />} /> {/* page d'accueil */}
        <Route path="profil" element={<Profil />} />
        <Route path="historique" element={<Historique />} />
      </Route>
    </Routes>
  )
}

export default App
