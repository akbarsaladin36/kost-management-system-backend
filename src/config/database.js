const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME
});

const connectDatabase = async () => {
    let conn;
    try {
        conn = await connection.getConnection();
        await conn.ping();
        console.log('✅ Database connected successfully');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    } finally {
        if (conn) conn.release();
    }
};

connectDatabase()

module.exports = connection