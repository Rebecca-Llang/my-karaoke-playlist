import { deleteSong } from '../apis/songsAPI'
import { Song } from '../../models/songs'

import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
  deleteId: number
}

function DeleteSong({ deleteId }: Props) {
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: async (deleteId: Song['id']) => deleteSong(deleteId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] })
    },
  })

  const handleClick = () => {
    addMutation.mutate(deleteId)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="button-primary delete-button"
        id="deleteSong"
      >
        Delete Song
      </button>
    </>
  )
}

export default DeleteSong
