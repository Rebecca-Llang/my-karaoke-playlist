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
      <ul className="songDetailsBox">
        <li className="songDetails">
          <span className="bold-p">Title:</span> {title}
        </li>
        <li className="songDetails">
          <span className="bold-p">Artist:</span> {artist}
        </li>
        <li className="songDetails">
          <span className="bold-p">Genre:</span> {genre}
        </li>
        <li className="songDetails">
          <span className="bold-p">Decade:</span> {decade}
        </li>
      </ul>

      <UpdateGenre songId={id} newGenre={genre} />
      <DeleteSong deleteId={id} />
    </>
  )
}

export default SongDetails
