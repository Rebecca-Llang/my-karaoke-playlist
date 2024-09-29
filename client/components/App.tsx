import NavBar from './NavBar.tsx'
import Songs from './Songs.tsx'

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className="main">
        <Songs />
      </section>
    </>
  )
}

export default App
