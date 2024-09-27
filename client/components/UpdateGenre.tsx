import { updateGenre } from '../apis/songsAPI'
import { ChangeEvent, useState } from 'react'

interface Props {
  songId: number
  newGenre: string
}

export default function UpdateGenre({ songId, newGenre }: Props) {
  const [genre, setGenre] = useState(newGenre)

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setGenre(value)
  }

  const handleSubmit = () => {
    console.log('handle submit', songId, genre)
    updateGenre(songId, genre)
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit} aria-label="Update Genre">
        <div>
          <label htmlFor="genre">Change Genre : </label>
          <input
            className="form__input"
            type="text"
            name="updateGenre"
            id="updateGenre"
            value={genre}
            onChange={onChangeHandle}
          />
        </div>
        <button type="submit" className="button-primary">
          Update
        </button>
      </form>
    </>
  )
}
