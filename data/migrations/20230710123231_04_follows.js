/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('follows', tbl => {
            tbl.increments('follows_id')
            tbl.integer('user_id')
                .references('user_id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('following_user_id').notNullable();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('follows')
};
