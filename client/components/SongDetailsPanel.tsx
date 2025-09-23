import DeleteSongButton from './DeleteSongButton'
import GenreEditor from './GenreEditor'

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

      <GenreEditor songId={id} newGenre={genre} />
      <DeleteSongButton deleteId={id} />
    </>
  )
}

export default SongDetails
