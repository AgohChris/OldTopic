import NavBar from "./NavBar"
import Hero from "./Hero"
import Footer from "./Footer"
const main = () => {
  return (
    <div
    style={{
        animation: "slideInLeft 1.2s ease-out forwards"
      }} >
        <NavBar/>
        <Hero/>
        <Footer/>
    </div>
  )
}

export default main