import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from './db/connection'
import request from 'supertest'
import server from './server'
import { StatusCodes } from 'http-status-codes'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('getting all songs', () => {
  it('responds with all the song data', async () => {
    const res = await request(server).get('/api/v1/songs')

    expect(res.body).toHaveLength(21)

    expect(res.body[0]).toStrictEqual({
      id: 1,
      title: 'I Wanna Dance With Somebody (Who Loves Me)',
      artist: 'Whitney Houston',
      genre: 'Pop',
      decade: 1980,
    })
  })
})

describe('getting song by id', () => {
  it('responds with the correct song by id', async () => {
    const songId = 2

    await connection('songs').where({ id: songId }).first()

    const res = await request(server).get(`/api/v1/songs/${songId}`)

    expect(res.status).toBe(200)

    expect(res.body).toStrictEqual({
      id: 2,
      title: 'Rolling in the Deep',
      artist: 'Adele',
      genre: 'Pop/Soul',
      decade: 2010,
    })
  })
})

describe('adding song', () => {
  it('creates a new record in the db of the song added', async () => {
    const initialSongs = await request(server).get('/api/v1/songs')
    const initialSongsLength = initialSongs.body.length

    const res = await request(server).post('/api/v1/songs').send({
      title: 'Ain’t No Mountain High Enough',
      artist: 'Marvin Gaye and Tammi Terrell',
      genre: 'R&B/Soul',
      decade: 1960,
    })

    expect(res.status).toBe(StatusCodes.CREATED)

    const allSongs = await request(server).get('/api/v1/songs')
    const allSongsLength = allSongs.body.length

    const songTitle = allSongs.body[allSongs.body.length - 1].title
    expect(songTitle).toStrictEqual('Ain’t No Mountain High Enough')

    expect(allSongsLength).toStrictEqual(initialSongsLength + 1)
  })
})

describe('deleting a song', () => {
  it('deletes a record in the db of the song selected', async () => {
    const initialSongs = await request(server).get('/api/v1/songs')
    const initialSongsLength = initialSongs.body.length

    const res = await request(server).get('/api/v1/songs/1')
    expect(res.status).toBe(StatusCodes.OK)

    const deleteRes = await request(server).delete('/api/v1/songs/1')
    expect(deleteRes.status).toBe(StatusCodes.NO_CONTENT)

    const allSongs = await request(server).get('/api/v1/songs')
    const afterDeletedLength = allSongs.body.length
    expect(afterDeletedLength).toStrictEqual(initialSongsLength - 1)
  })
})
