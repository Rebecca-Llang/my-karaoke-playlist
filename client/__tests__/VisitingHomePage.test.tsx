// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderRoute } from './Setup.tsx'
import { waitFor, waitForElementToBeRemoved } from '@testing-library/react/pure'
import nock from 'nock'

describe('Shows Home page with header', () => {
  it('shows a header with the My Karaoke Playlist', async () => {
    // Arrange
    const screen = renderRoute('/')
    // Act & Assert
    const headerHeading = screen.getByRole('heading', {
      name: 'My Karaoke Playlist',
    })
    expect(headerHeading).toBeVisible()

    const playlistNavLink = await screen.findByRole('link', {
      name: 'View My Playlist',
    })
    expect(playlistNavLink).toBeInTheDocument()
  })

  it('when View My Playlist navLink is clicked, user is redirected to My Songs', async () => {
    // Arrange
    const scope = nock('http://localhost')
      .get('/api/v1/songs')
      .reply(200, [
        {
          id: 1,
          title: 'The Best Song',
          artist: 'The Best Artist',
          genre: 'Pop',
          decade: 1990,
        },
      ])
    const { user, ...screen } = renderRoute('/')

    const playlistNavLink = screen.getByRole('link', {
      name: 'View My Playlist',
    })

    // Act & Assert
    await user.click(playlistNavLink)

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

    await waitFor(() => {
      const mySongs = screen.getByRole('heading', { name: /My Songs:/i })
      expect(mySongs).toBeVisible()
    })

    expect(scope.isDone()).toBe(true)
  })

  it('shows a heading with the name "Add A New Song:"', async () => {
    // Arrange
    const screen = renderRoute('/')
    // Act & Assert
    const addNewSongHeading = screen.getByRole('heading', {
      name: 'Add A New Song',
    })
    expect(addNewSongHeading).toBeVisible()
  })
})
