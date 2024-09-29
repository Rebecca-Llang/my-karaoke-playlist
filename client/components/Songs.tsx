import { useQuery } from '@tanstack/react-query'
import { getAllSongs } from '../apis/songsAPI'
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
      <div className="songsPlaylist">
        <h3>My Songs Playlist:</h3>
        <ul className="songList">
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
      </div>
    </>
  )
}

export default Songs
