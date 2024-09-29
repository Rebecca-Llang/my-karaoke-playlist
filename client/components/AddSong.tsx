import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import { NewSong } from '../../models/songs'
import { addSong } from '../apis/songsAPI'
import SelectDecade from './SelectDecade'

function AddSong() {
  const [newSong, setNewSong] = useState<NewSong>({
    title: '',
    artist: '',
    genre: '',
    decade: null,
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: async (newSong: NewSong) => addSong(newSong),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    },
  })

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.id
    const value = event.target.value

    const newSongObj = { ...newSong, [key]: value }

    setNewSong(newSongObj)
  }

  const handleDecadeSubmit = (decade: number) => {
    setNewSong({ ...newSong, decade })
  }

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    addMutation.mutate(newSong)
  }

  return (
    <>
      <h2>Add A New Song</h2>
      <div className="addSong">
        <form className="form" onSubmit={handleSubmit} aria-label="Add song">
          <div>
            <label htmlFor="title">Song Title: </label>
            <input
              autoFocus
              className="form__input"
              type="text"
              name="title"
              id="title"
              value={newSong.title}
              onChange={onChangeHandle}
              placeholder="Like a Prayer"
            />
          </div>
          <div>
            <label htmlFor="artist">Artist Name: </label>
            <input
              className="form__input"
              type="text"
              name="artist"
              id="artist"
              value={newSong.artist}
              onChange={onChangeHandle}
              placeholder="Madonna"
            />
          </div>
          <div>
            <label htmlFor="genre">Genre: </label>
            <input
              className="form__input"
              type="text"
              name="genre"
              id="genre"
              value={newSong.genre}
              onChange={onChangeHandle}
              placeholder="Pop Rock"
            />
          </div>
          <div>
            <label htmlFor="decade">Decade: </label>
            <SelectDecade onSelect={handleDecadeSubmit} />
          </div>
          <button type="submit" className="button-primary">
            Add To My Playlist
          </button>
        </form>
      </div>
    </>
  )
}
export default AddSong
