import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from './db/connection'
import request from 'supertest'
import server from './server'

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
