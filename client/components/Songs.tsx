import { useQuery } from '@tanstack/react-query'
import { getAllSongs } from '../apis/songsAPI'
import AddSong from './AddSong'
import Song from './Song'

function Songs() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['songs'],
    queryFn: () => getAllSongs(),
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(error.message)
    return <p>Error...</p>
  }

  return (
    <>
      <h1>Songs:</h1>
      <ul>
        {data.map((song) => (
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

      <h2>Add new Song</h2>
      <AddSong />
    </>
  )
}

export default Songs
