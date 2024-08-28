import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Song } from '../../models/songs'
import { addSong } from '../apis/songsAPI'

function AddSong() {
  // declare state for setting new song, set initial data object
  // newSong can also be the destructed data {title, artist, genre, decade}
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    genre: '',
    decade: 2000,
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: async (newSong: Song) => addSong(newSong),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    },
  })

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    //  const { name, value } = evt.currentTarget
    const key = event.target.id
    const value = event.target.value

    // returns newSong obj, key as id and value as input
    const newSongObj = { ...newSong, [key]: value }

    setNewSong(newSongObj)
  }

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    addMutation.mutate(newSong)
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit} aria-label="Add song">
        <div>
          <label htmlFor="title">Song Title</label>
          <input
            className="form__input"
            type="text"
            name="title"
            id="title"
            value={newSong.title}
            onChange={onChangeHandle}
          />
        </div>
        <div>
          <label htmlFor="artist">Artist Name</label>
          <input
            className="form__input"
            type="text"
            name="artist"
            id="artist"
            value={newSong.artist}
            onChange={onChangeHandle}
          />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input
            className="form__input"
            type="text"
            name="genre"
            id="genre"
            value={newSong.genre}
            onChange={onChangeHandle}
          />
        </div>
        <div>
          <label htmlFor="artist">Decade</label>
          <input
            className="form__input"
            type="text"
            name="decade"
            id="decade"
            value={newSong.decade}
            onChange={onChangeHandle}
          />
        </div>

        <button type="submit" className="button-primary">
          Add Song
        </button>
      </form>
    </>
  )
}
export default AddSong
