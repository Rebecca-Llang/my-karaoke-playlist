interface Props {
  id?: number
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
      {/* <DeleteSong deleteId={{ id }} /> */}
    </>
  )
}

export default SongDetails
