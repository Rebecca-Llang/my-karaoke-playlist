import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
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

  const [showSubmitMsg, setShowSubmitMsg] = useState(false)

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationKey: ['addSong'],
    mutationFn: async (newSong: NewSong) => addSong(newSong),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
      setShowSubmitMsg(true)

      setNewSong({
        title: '',
        artist: '',
        genre: '',
        decade: null,
      })
    },
  })

  useEffect(() => {
    if (showSubmitMsg) {
      const timer = setTimeout(() => {
        console.log('submit', showSubmitMsg)
        setShowSubmitMsg(false)
      }, 7000)

      return () => clearTimeout(timer)
    }
  }, [showSubmitMsg])

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

  if (addMutation.isPending) {
    return <p>Adding Song...</p>
  }

  if (addMutation.isError) {
    return <p>Oh no! Error adding song: {addMutation.error.message}</p>
  }

  return (
    <>
      <div className="addSongContainer">
        <h2>Add A New Song</h2>

        <div className="addSong">
          <form className="form" onSubmit={handleSubmit} aria-label="Add song">
            <div className="addSongForm">
              <label htmlFor="title">Song Title: </label>
              <input
                className="form__input"
                type="text"
                name="title"
                id="title"
                value={newSong.title}
                onChange={onChangeHandle}
                placeholder="Like a Prayer"
              />
            </div>
            <div className="addSongForm">
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
            <div className="addSongForm">
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
            <div className="addSongForm">
              <label htmlFor="decade">Decade: </label>
              <SelectDecade onSelect={handleDecadeSubmit} />
            </div>
            <button
              type="submit"
              className="button-primary addSongForm"
              disabled={addMutation.isPending}
            >
              {addMutation.isPending ? 'Adding...' : 'Add to My Playlist'}
            </button>
            {showSubmitMsg && (
              <div className="addSongSubmitMessage">
                <p>Song has been added to Playlist!</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
export default AddSong
