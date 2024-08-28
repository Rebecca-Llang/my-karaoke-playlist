import { useState } from 'react'
import SongDetails from './SongDetails'

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
    <div key={id}>
      <li>{`${title} by ${artist}`}</li>
      <button onClick={handleClick}>Details</button>
      {showDetails && (
        <SongDetails
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
