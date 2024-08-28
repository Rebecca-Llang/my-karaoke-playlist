// prop is deleteSong
import { useQuery } from '@tanstack/react-query'
import { deleteSong } from '../apis/songsAPI'
import { Song } from '../../models/songs'
import { React, useState, ChangeEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Prop {
  deleteId: number
}
//use queryclient and useMutation

function DeleteSong() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['song'],
    queryFn: () => getSongById(id),
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(error.message)
    return <p>Error...</p>
  }

  return (
    // turn each one into a button that when clicked will route to getSongFromId which will
    // then have a delete button and will remove from list and db
    <>
      <h1>Song:</h1>

      <h2>Delete Song</h2>
    </>
  )
}

export default DeleteSong
