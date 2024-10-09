import { useQuery } from '@tanstack/react-query'
import { getAllSongs } from '../apis/songsAPI'
import Song from './Song'
import FilterByDecade from './FilterByDecade'
import { useState, useEffect } from 'react'
import FilterByGenre from './FilterByGenre'

function Songs() {
  const [selectedDecade, setSelectedDecade] = useState<number | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [showNoResultMsg, setShowNoResultMsg] = useState(false)

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['songs'],
    queryFn: () => getAllSongs(),
  })

  useEffect(() => {
    if (data) {
      const hasResults = data.some((song) => {
        const decadeMatch = selectedDecade
          ? song.decade === selectedDecade
          : true
        const genreMatch = selectedGenre ? song.genre === selectedGenre : true

        return decadeMatch && genreMatch
      })
      setShowNoResultMsg(!hasResults)
    }
  }, [data, selectedDecade, selectedGenre])

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(error.message)
    return <p>Oh no! Error...</p>
  }

  const filteredResult = data.filter((song) => {
    const decadeMatch = selectedDecade ? song.decade === selectedDecade : true
    const genreMatch = selectedGenre ? song.genre === selectedGenre : true

    return decadeMatch && genreMatch
  })

  return (
    <>
      <div className="songsPlaylist">
        <h3 id="songsPlaylist">My Songs:</h3>
        <div className="filters">
          <h4>Filter By Decade:</h4>
          <FilterByDecade
            data={data}
            onDecadeChange={(decade) => setSelectedDecade(decade)}
          />

          <FilterByGenre
            data={data}
            onGenreChange={(genre) => setSelectedGenre(genre)}
          />
        </div>
        {showNoResultMsg ? (
          <p>No songs match your filter preference</p>
        ) : (
          <ul className="songList">
            {filteredResult.map((song) => (
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
        )}
      </div>
    </>
  )
}

export default Songs
