import connection from './connection'
import { NewSong, Song } from '../../models/songs'

const db = connection

// getAllSongs() for db route
export function getAllSongs(): Promise<Song[]> {
  return db('songs').select('id', 'title', 'artist', 'genre', 'decade')
}

// getSongById(id) for db route
export async function getSongById(id: number) {
  try {
    const song = await db('songs')
      .select('id', 'title', 'artist', 'genre', 'decade')
      .where({ id })
      .first()

    if (!song) {
      throw new Error(`Song with ID ${id} not found`)
    }

    return song
  } catch (error) {
    console.error(`Error fetching song by ID: ${error}`)
    throw error
  }
}

// addSong(newSong) for db route
export function addSong(newSong: NewSong): Promise<NewSong> {
  return db('songs').insert(newSong)
}

// deleteSong(id) for db route
export function deleteSong(id: number) {
  return db('songs').where({ id }).del()
}

//updateGenre(id) for db route
export function updateGenre(id: number, newGenre: string) {
  return db('songs').where({ id }).select('genre').update('genre', newGenre)
}
