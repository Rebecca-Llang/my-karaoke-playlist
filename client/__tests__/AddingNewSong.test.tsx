// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { within, waitFor } from '@testing-library/react'
import { renderRoute } from './Setup'
import nock from 'nock'
import { StatusCodes } from 'http-status-codes'

const initialSongs = [
  {
    id: 1,
    title: 'I Wanna Dance With Somebody (Who Loves Me)',
    artist: 'Whitney Houston',
    genre: 'Pop',
    decade: 1980,
  },
  {
    id: 2,
    title: 'Rolling in the Deep',
    artist: 'Adele',
    genre: 'Pop/Soul',
    decade: 2010,
  },
  {
    id: 3,
    title: 'Total Eclipse of the Heart',
    artist: 'Bonnie Tyler',
    genre: 'Pop/Rock',
    decade: 1980,
  },
]

describe('Adding a new song to the playlist', () => {
  it('Shows the Add a New Song form', async () => {
    // Arrange
    nock('http://localhost').get('/api/v1/songs').reply(200, initialSongs)
    const screen = renderRoute('/')
    // Act
    const addNewSongForm = await screen.findByRole('form', { name: 'Add song' })
    // Assert
    expect(addNewSongForm).toBeVisible()
  })

  it('Submits the form and shows a success message', async () => {
    // Arrange
    nock('http://localhost').get('/api/v1/songs').reply(200, initialSongs)

    const newSong = {
      title: 'Like a Prayer',
      artist: 'Madonna',
      genre: 'Pop Rock',
      decade: 1980,
    }

    // onClick submit button: POST request to /api/v1/songs
    nock('http://localhost')
      .post('/api/v1/songs', newSong)
      .reply(StatusCodes.CREATED, { id: 4, ...newSong })

    const { user, ...screen } = renderRoute('/')

    // Act & Assert
    const form = await screen.findByRole('form', { name: 'Add song' })

    const titleInput = await within(form).findByLabelText('Song Title:')
    await user.clear(titleInput)
    await user.type(titleInput, newSong.title)

    const artistInput = await within(form).findByLabelText('Artist Name:')
    await user.type(artistInput, newSong.artist)

    const genreInput = await within(form).findByLabelText('Genre:')
    await user.type(genreInput, newSong.genre)

    const decadeInput = await within(form).findByLabelText('Decade:')
    await user.selectOptions(decadeInput, newSong.decade.toString())

    const submitButton = await within(form).findByRole('button', {
      name: 'Add to My Playlist',
    })
    await user.click(submitButton)

    await waitFor(
      () => {
        const submitMsg = screen.getByText('Song has been added to Playlist!')
        expect(submitMsg).toBeInTheDocument()
      },
      { timeout: 2000 },
    )
  })

  it('throws an error when adding a new song fails'),
    async () => {
      nock('http://localhost').get('/api/v1/songs').reply(200, initialSongs)

      const newSong = {
        title: 'Like a Prayer',
        artist: 'Madonna',
        genre: 'Pop Rock',
        decade: 1980,
      }

      nock('http://localhost')
        .post('/api/v1/songs', newSong)
        .reply(StatusCodes.INTERNAL_SERVER_ERROR, { message: 'Server error' })

      const { user, ...screen } = renderRoute('/')

      // Act & Assert
      const form = await screen.findByRole('form', { name: 'Add song' })

      const titleInput = await within(form).findByLabelText('Song Title:')
      await user.clear(titleInput)
      await user.type(titleInput, newSong.title)

      const artistInput = await within(form).findByLabelText('Artist Name:')
      await user.type(artistInput, newSong.artist)

      const genreInput = await within(form).findByLabelText('Genre:')
      await user.type(genreInput, newSong.genre)

      const decadeInput = await within(form).findByLabelText('Decade:')
      await user.selectOptions(decadeInput, newSong.decade.toString())

      const submitButton = await within(form).findByRole('button', {
        name: 'Add to My Playlist',
      })
      await user.click(submitButton)

      await waitFor(
        () => {
          const errorMsg = screen.getByText('Oh no! Error adding song:')
          expect(errorMsg).toBeInTheDocument()
        },
        { timeout: 2000 },
      )
    }
})
