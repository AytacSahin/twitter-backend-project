// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const sharedConfig = {
  client: 'sqlite3',
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
  // SQLite için aşağıdaki satırları ekliyoruz
  useNullAsDefault: true,
  // aşağıdaki satır foreign keys'i SQLite'da aktifleştirir
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done)
    },
  },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: './data/twitter.db3' },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './data/testing.db3' },
  },
  production: {
    ...sharedConfig,
    connection: {
      host: 'https://aytacsahin-twitter-backend.onrender.com',
      filename: './data/render.db3'
    },
  },
}