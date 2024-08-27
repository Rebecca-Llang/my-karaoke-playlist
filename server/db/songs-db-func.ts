import connection from './connection'
import { Song } from '../../models/songs'

const db = connection

// getAllSongs() for db route
export function getAllSongs(): Promise<Song[]> {
  return db('songs').select('id', 'title', 'artist', 'genre', 'decade')
}

// getSongById(id) for db route
export function getSongById(id: number): Promise<Song> {
  return db('songs')
    .where({ id })
    .select('id', 'title', 'artist', 'genre', 'decade')
    .first() //will only return one Song object and not a array of songs
}

// deleteSong(id) for db route
export function deleteSong(id: number) {
  return db('songs').where({ id }).del()
}

// addSong(newSong) for db route
export function addSong(newSong: Song) {
  return db('songs').insert(newSong)
}
