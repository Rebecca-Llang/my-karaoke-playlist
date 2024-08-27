/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('songs', (song) => {
    song.increments('id'),
      song.string('title'),
      song.string('artist'),
      song.string('genre'),
      song.integer('decade')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('songs')
}
