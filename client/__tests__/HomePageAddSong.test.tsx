// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderRoute } from './Setup.tsx'

describe('Home page addSong component', () => {
  it('shows a heading with the name "Add A New Song:"', async () => {
    // Arrange
    const screen = renderRoute('/')
    // Act
    // Assert
    const addNewSong = screen.getByRole('heading', { name: 'Add A New Song' })
    expect(addNewSong).toBeVisible()
  })
})
