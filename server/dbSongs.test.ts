import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from './db/connection'
import * as db from './db/songs-db-func'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

const mockNewSong = {
  title: 'Like a Prayer',
  artist: 'Madonna',
  genre: 'Pop Rock',
  decade: 1980,
}

describe('db.getAllSongs()', () => {
  it('gets all of the songs', async () => {
    const songs = await db.getAllSongs()

    expect(songs).toHaveLength(21)
  })
})

describe('db.addSong()', () => {
  it('adds a new song to the db', async () => {
    await db.addSong(mockNewSong)
    const allSongs = await db.getAllSongs()
    const latestSong = allSongs.pop()

    expect(latestSong?.artist).toBe('Madonna')
  })
})

describe('getSongById', () => {
  it('should return the correct Song object when a valid ID is provided', async () => {
    const song = await db.getSongById(2)
    expect(song).toStrictEqual({
      id: 2,
      title: 'Rolling in the Deep',
      artist: 'Adele',
      genre: 'Pop/Soul',
      decade: 2010,
    })
  })
})
