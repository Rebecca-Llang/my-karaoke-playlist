import { Outlet } from 'react-router-dom'

import NavBar from './NavBar.tsx'

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className="main">
        <Outlet />
      </section>
    </>
  )
}

export default App
