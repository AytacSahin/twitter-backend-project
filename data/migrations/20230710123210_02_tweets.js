/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('tweets', tbl => {
            tbl.increments('tweet_id')
            tbl.string('content').notNullable()
            tbl.integer('likes').defaultTo(0)
            tbl.integer('user_id')
                .references('user_id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.timestamps(true, true);
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tweets')
};
