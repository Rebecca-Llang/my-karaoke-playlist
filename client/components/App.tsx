import { Outlet } from 'react-router-dom'

import NavBar from './NavBar.tsx'
import Footer from './Footer.tsx'

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className="main">
        <Outlet />
      </section>
      <Footer />
    </>
  )
}

export default App
