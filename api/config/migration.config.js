// This works with migration

module.exports = {
  host: "db",
  username: "postgres",
  password: "postgres",
  database: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};