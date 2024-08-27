import { useQuery } from '@tanstack/react-query'
import { addSong, getAllSongs } from '../apis/songsAPI'
import AddSong from './AddSong'

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

  console.log('songs component', data)

  return (
    <>
      <h1>Songs</h1>
      <ul>
        {data.map((song) => (
          <li key={song.id}>{`${song.title} by ${song.artist}`}</li>
        ))}
      </ul>

      <h2>Add new Song</h2>
      <AddSong />
    </>
  )
}

export default Songs
