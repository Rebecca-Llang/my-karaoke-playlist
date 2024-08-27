/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// should make genres plural

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('songs').del()
  await knex('songs').insert([
    {
      title: 'I Wanna Dance With Somebody (Who Loves Me)',
      artist: 'Whitney Houston',
      genre: 'Pop',
      decade: '1980',
    },

    {
      title: 'Rolling in the Deep',
      artist: 'Adele',
      genre: 'Pop/Soul',
      decade: '2010',
    },

    {
      title: 'Total Eclipse of the Heart',
      artist: 'Bonnie Tyler',
      genre: 'Pop/Rock',
      decade: '1980',
    },

    {
      title: 'Never Gonna Give You Up',
      artist: 'Rick Astley',
      genre: 'Pop',
      decade: '1980',
    },

    {
      title: 'Wrecking Ball',
      artist: ' Miley Cyrus',
      genre: 'Pop',
      decade: '2010',
    },
  ])
}
