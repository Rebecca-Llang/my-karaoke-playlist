// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest'
import { renderRoute } from './Setup'
import nock from 'nock'

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

beforeAll(() => {
  nock.disableNetConnect()
})

describe('deleting a selected song', () => {
  it('shows the delete button and deletes the selected song', async () => {
    nock('http://localhost')
      .get('/api/v1/songs')
      .reply(200, initialSongs)
      .persist()
    const { user, ...screen } = renderRoute('/songs')

    const detailsButton = await screen.findAllByRole('button', {
      name: 'Details',
    })
    expect(detailsButton[0]).toBeVisible()

    await user.click(detailsButton[0])

    const deleteButtons = await screen.findAllByRole('button', {
      name: 'Delete Song',
    })

    const deleteButton = deleteButtons[0]
    expect(deleteButton).toBeInTheDocument()

    const id = 1
    const deleteScope = nock('http://localhost')
      .delete(`/api/v1/songs/${id}`)
      .reply(200)

    await user.click(deleteButton)

    expect(deleteScope.isDone()).toBe(true)
  })
})
