import { useQuery } from '@tanstack/react-query'
import { getAllSongs } from '../apis/songsAPI'
import Song from './Song'
import FilterByDecade from './FilterByDecade'
import { useState } from 'react'

function Songs() {
  const [selectedDecade, setSelectedDecade] = useState<number | null>(null)
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['songs'],
    queryFn: () => getAllSongs(),
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(error.message)
    return <p>Oh no! Error...</p>
  }

  const filteredSongs = selectedDecade
    ? data.filter((songs) => songs.decade === selectedDecade)
    : data

  console.log('data', data)

  return (
    <>
      <div className="songsPlaylist">
        <h3 id="songsPlaylist">My Songs:</h3>
        <div className="filterDecade">
          <h4>Filter By Decade:</h4>
          <FilterByDecade
            data={data}
            onDecadeChange={(decade) => setSelectedDecade(decade)}
          />
        </div>

        <ul className="songList">
          {filteredSongs.map((song) => (
            <Song
              key={song.id}
              id={song.id}
              title={song.title}
              artist={song.artist}
              genre={song.genre}
              decade={song.decade}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

export default Songs
