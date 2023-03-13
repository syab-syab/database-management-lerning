const { Pool } = require("pg");

var pass = 'tset-esabatad-database-test';

const pool = new Pool({
  user: 'postgres',
  host: 'db.ncddhgoemdbghyzcmvmg.supabase.co',
  database: 'postgres',
  password: pass,
  port: 5432,
  ssl: {
    sslmode: 'require',
    rejectUnauthorized: false
  }
})

module.exports = pool;