import { useState } from 'react'
import SongDetailsPanel from './SongDetailsPanel'

interface Props {
  id: number
  title: string
  artist: string
  genre: string
  decade: number
}

export function Song({ id, title, artist, genre, decade }: Props) {
  const [showDetails, setShowDetails] = useState(false)

  const handleClick = () => {
    setShowDetails(!showDetails)
    console.log(showDetails)
  }
  return (
    <div key={id} className="song">
      <li className="title">
        <span className="bold-p">{`${title}`}</span> by {`${artist}`}
      </li>
      <button
        onClick={handleClick}
        className="button-secondary"
        id="songDetails"
      >
        Details
      </button>
      {showDetails && (
        <SongDetailsPanel
          id={id}
          title={title}
          artist={artist}
          genre={genre}
          decade={decade}
        />
      )}
    </div>
  )
}

export default Song
