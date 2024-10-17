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
      id: 1,
      title: 'I Wanna Dance With Somebody (Who Loves Me)',
      artist: 'Whitney Houston',
      genre: 'Pop',
      decade: '1980',
    },

    {
      id: 2,
      title: 'Rolling in the Deep',
      artist: 'Adele',
      genre: 'Pop/Soul',
      decade: '2010',
    },

    {
      id: 3,
      title: 'Total Eclipse of the Heart',
      artist: 'Bonnie Tyler',
      genre: 'Pop/Rock',
      decade: '1980',
    },

    {
      id: 4,
      title: 'Never Gonna Give You Up',
      artist: 'Rick Astley',
      genre: 'Pop',
      decade: '1980',
    },

    {
      id: 5,
      title: 'Wrecking Ball',
      artist: ' Miley Cyrus',
      genre: 'Pop',
      decade: '2010',
    },
    {
      id: 6,
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      genre: 'Rock',
      decade: '1970',
    },
    {
      id: 7,
      title: 'Mr. Brightside',
      artist: 'The Killers',
      genre: 'Rock',
      decade: '2000',
    },
    {
      id: 8,
      title: 'Don’t Stop Believin’',
      artist: 'Journey',
      genre: 'Rock',
      decade: '1980',
    },
    {
      title: 'Dancing Queen',
      artist: 'ABBA',
      genre: 'Pop/Disco',
      decade: '1970',
    },
    {
      title: 'My Heart Will Go On',
      artist: 'Celine Dion',
      genre: 'Pop',
      decade: '1990',
    },
    {
      title: 'Hey Jude',
      artist: 'The Beatles',
      genre: 'Rock',
      decade: '1960',
    },
    {
      title: 'Someone Like You',
      artist: 'Adele',
      genre: 'Pop',
      decade: '2010',
    },
    {
      title: 'We Are the Champions',
      artist: 'Queen',
      genre: 'Rock',
      decade: '1970',
    },
    {
      title: 'Toxic',
      artist: 'Britney Spears',
      genre: 'Pop',
      decade: '2000',
    },
    {
      title: 'I Will Survive',
      artist: 'Gloria Gaynor',
      genre: 'Pop/Disco',
      decade: '1970',
    },
    {
      title: 'Take On Me',
      artist: 'a-ha',
      genre: 'Pop',
      decade: '1980',
    },
    {
      title: 'I Want It That Way',
      artist: 'Backstreet Boys',
      genre: 'Pop',
      decade: '1990',
    },
    {
      title: 'Girls Just Want to Have Fun',
      artist: 'Cyndi Lauper',
      genre: 'Pop',
      decade: '1980',
    },
    {
      title: 'Old Town Road',
      artist: 'Lil Nas X ft. Billy Ray Cyrus',
      genre: 'Country/Pop',
      decade: '2010',
    },
    {
      title: 'Torn',
      artist: 'Natalie Imbruglia',
      genre: 'Pop/Rock',
      decade: '1990',
    },
    {
      title: 'Valerie',
      artist: 'Amy Winehouse',
      genre: 'Pop/Soul',
      decade: '2000',
    },
  ])
}
