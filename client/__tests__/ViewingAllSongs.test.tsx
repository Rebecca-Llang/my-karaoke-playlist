// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderRoute } from './Setup.tsx'

describe('Viewing all songs on My Playlist page', () => {
  it('shows all songs that are added to your playlist'),
    async () => {
      // Arrange
      const screen = renderRoute('/songs')
      // Act
      // Assert
      const playlistHeading = await screen.findByRole('heading', {
        name: 'My Songs',
      })

      expect(playlistHeading).toBeVisible()
    }
})
