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

const existingSong = {
  id: 2,
  title: 'Rolling in the Deep',
  artist: 'Adele',
  genre: 'Pop/Soul',
  decade: 2010,
}

describe('db.getAllSongs()', () => {
  it('gets all of the songs', async () => {
    const songs = await db.getAllSongs()
    expect(songs).toHaveLength(21)
    expect(songs[1]).toStrictEqual(existingSong)
  })
})

describe('db.getSongById()', () => {
  it('should return the correct Song object when a valid ID is provided', async () => {
    const song = await db.getSongById(2)
    expect(song).toStrictEqual(existingSong)
  })
})

describe('db.addSong()', () => {
  it('adds a new song to the db', async () => {
    await db.addSong(mockNewSong)
    const allSongs = await db.getAllSongs()
    const latestSong = allSongs.find((song) => song.title === mockNewSong.title)

    expect(latestSong).toBeDefined()
    expect(latestSong?.artist).toBe(mockNewSong.artist)
    expect(latestSong?.title).toBe(mockNewSong.title)
    expect(latestSong?.genre).toBe(mockNewSong.genre)
    expect(latestSong?.decade).toBe(mockNewSong.decade)
  })
})

describe('db.deleteSong()', () => {
  it('deletes the selected song', async () => {
    const initialSongs = await db.getAllSongs()
    const initialSongsLength = initialSongs.length

    const song = await db.getSongById(2)
    expect(song).toStrictEqual(existingSong)

    await db.deleteSong(2)

    const allSongs = await db.getAllSongs()

    expect(allSongs.length).toStrictEqual(initialSongsLength - 1)
  })
})

describe('db.updateGenre()', () => {
  it('updates genre of selected song', async () => {
    const song = await db.getSongById(2)
    expect(song.genre).toStrictEqual(existingSong.genre)

    const newGenre = 'Soul'
    await db.updateGenre(2, newGenre)

    const updatedSong = await db.getSongById(2)
    expect(updatedSong.genre).toStrictEqual(newGenre)
  })
})
