// route functions
import Router from 'express'
import db from '../db/connection'

const router = Router()

// GET allSongs /api/v1/songs
router.get('/', async (req, res) => {
  try {
    const songs = await db('songs').select() // await db.getAllSongs()
    res.json(songs)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

export default router
