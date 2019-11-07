require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM locations ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
};

const createUser = (request, response) => {
  const { lat, lon } = request.body

  pool.query('INSERT INTO locations (lat, lon) VALUES ($1, $2)', [lat, lon], (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User added with ID: ${result.insertId}`)
  })
};

module.exports = {
    getUsers,
    createUser,
};