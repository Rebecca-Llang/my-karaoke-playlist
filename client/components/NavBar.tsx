import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <>
      <div>
        <NavLink to="/">
          <h1 className="header h1">My Karaoke Playlist</h1>
        </NavLink>
      </div>
      <div>
        <NavLink to="/songs" className="navLinks">
          My Playlist
        </NavLink>
      </div>
    </>
  )
}
