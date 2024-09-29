import AddSong from './AddSong.tsx'
import NavBar from './NavBar.tsx'
import Songs from './Songs.tsx'

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className="main">
        <AddSong />
        <Songs />
      </section>
    </>
  )
}

export default App
