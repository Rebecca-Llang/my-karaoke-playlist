import DeleteSong from './DeleteSong'
import UpdateGenre from './UpdateGenre'

interface Props {
  id: number
  title: string
  artist: string
  genre: string
  decade: number
}

function SongDetails({ id, title, artist, genre, decade }: Props) {
  return (
    <>
      <p>Song details: </p>

      <ul>
        <li>{title}</li>
        <li>{artist}</li>
        <li>{genre}</li>
        <li>{decade}</li>
      </ul>

      <DeleteSong deleteId={id} />
      <UpdateGenre songId={id} newGenre={genre} />
    </>
  )
}

export default SongDetails
