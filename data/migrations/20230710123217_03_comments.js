/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('comments', tbl => {
            tbl.increments('comment_id')
            tbl.string('content').notNullable()
            tbl.integer('likes').defaultTo(0)
            tbl.timestamps(true, true);
            tbl.integer('user_id')
                .references('user_id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('tweet_id')
                .references('tweet_id')
                .inTable('tweets')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('comments')
};
