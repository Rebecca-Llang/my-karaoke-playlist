import request from 'superagent'
import { NewSong, Song } from '../../models/songs.ts'

// GET allSongs /api/v1/songs

export async function getAllSongs() {
  const result = await request.get('/api/v1/songs')
  console.log('getAllSongs results:', result.statusCode)
  return result.body as Song[]
}

// GET SongById(id) /api/v1/songs/:id

export async function getSongById(id: number) {
  const result = await request.get(`/api/v1/songs/${id}`)
  console.log('getSongById results', result.statusCode)
  return result.body as Song
}

// POST addSong(newSong) /api/v1/songs

export async function addSong(newSong: NewSong) {
  const result = await request.post('/api/v1/songs').send(newSong)
  console.log(result.statusCode)
  return
}

//DEL deleteSong(id) /api/v1/songs

export async function deleteSong(id: number) {
  const result = await request.delete(`/api/v1/songs/${id}`)
  console.log(result.statusCode)
  return
}

// NEED HELP HERE
//UPDATE updateGenre(id, newGenre)

export async function updateGenre(id: number, newGenre: string) {
  const result = await request
    .patch(`/api/v1/songs/${id}`)
    .send({ genre: newGenre })
  console.log(result.statusCode)
  console.log('front api', newGenre)
  return
}
