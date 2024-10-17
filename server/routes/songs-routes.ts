// route functions
import Router from 'express'
import * as db from '../db/songs-db-func'

const router = Router()

// GET allSongs /api/v1/songs
router.get('/', async (req, res) => {
  try {
    const songs = await db.getAllSongs()
    res.json(songs)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

//GET getSongById(id) /api/v1/songs/:id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const song = await db.getSongById(id)

    res.json(song)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

//POST addSong(newSong) /api/v1/songs
router.post('/', async (req, res) => {
  const newSong = req.body // sets request as body of the newSong
  try {
    await db.addSong(newSong)
    res.sendStatus(200)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

//DEL deleteSong(id) /api/v1/songs/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.deleteSong(id)
    res.sendStatus(200)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

//PATCH updateGenre(id, newGenre) /api/v1/songs/:id
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { genre } = req.body
  console.log(genre)
  try {
    await db.updateGenre(id, genre)
    res.sendStatus(200)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})
export default router
