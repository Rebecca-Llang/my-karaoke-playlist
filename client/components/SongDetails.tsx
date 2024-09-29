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
      <ul>
        <li className="songDetails">Title: {title}</li>
        <li className="songDetails">Artist: {artist}</li>
        <li className="songDetails">Genre: {genre}</li>
        <li className="songDetails">Decade: {decade}</li>
      </ul>

      <DeleteSong deleteId={id} />
      <UpdateGenre songId={id} newGenre={genre} />
    </>
  )
}

export default SongDetails
