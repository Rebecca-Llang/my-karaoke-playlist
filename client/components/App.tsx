import Songs from './Songs.tsx'
import Song from './SongDetails.tsx'

function App() {
  return (
    <>
      <header className="header">
        <h1>My Karaoke Playlist</h1>
      </header>
      <section className="main">
        <Songs />
      </section>
    </>
  )
}

export default App
