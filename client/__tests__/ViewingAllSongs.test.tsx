// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderRoute } from './Setup'
import { screen } from '@testing-library/react'

import nock from 'nock'

const mockPlaylistSongs = [
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

describe('Viewing all songs on My Playlist page', () => {
  it('shows an error if server fails'),
    async () => {
      // Arrange
      nock('http://localhost')
        .get('/api/v1/songs')
        .reply(500, 'Oh no! Error...')

      const screen = renderRoute('/songs')
      // Act
      const errorMessage = await screen.findByText(/Oh no! Error.../)
      // Assert
      expect(errorMessage).toBeVisible()
    }

  it('shows heading for My Songs'),
    async () => {
      nock('http://localhost')
        .get('/api/v1/songs')
        .reply(200, mockPlaylistSongs)
      // Arrange
      const screen = renderRoute('/songs')
      // Act

      const playlistHeading = await screen.findByRole('heading', {
        name: 'My Songs',
      })
      // Assert
      expect(playlistHeading).toBeVisible()
    }

  it('shows a list of all songs on playlist'),
    async () => {
      nock('http://localhost')
        .get('/api/v1/songs')
        .reply(200, mockPlaylistSongs)
      // Arrange
      renderRoute('/songs')
      // Act
      await screen.findByRole('heading', { name: 'My Songs' })
      // Assert
      mockPlaylistSongs.forEach((song) => {
        const songElement = screen.getByText(song.title)
        expect(songElement).toBeInTheDocument()
      })
    }
})
