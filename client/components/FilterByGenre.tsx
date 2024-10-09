import { Song } from '../../models/songs'

interface Props {
  data: Song[]
  onGenreChange: (genre: string) => void
}

export default function FilterByGenre({ onGenreChange, data }: Props) {
  const genres = new Set(data.map((song) => song.genre))

  const genreArr = [...genres]

  console.log('genres', genreArr)
  return (
    <>
      <label htmlFor="genreFilter">
        <select
          name="filterByGenre"
          id="genreFilter"
          onChange={(e) => onGenreChange(e.target.value)}
        >
          <option value="">All Genres</option>
          {genreArr.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>
    </>
  )
}
