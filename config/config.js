require('dotenv').config();

const DB_URI = process.env.DB_URI;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const MONGO_DBNAME = process.env.MONGO_DBNAME;
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET_KEY;

module.exports = {
    MONGO_DBNAME,
    DB_URI,
    DB_USER,
    DB_PASSWORD,
    PORT, 
    SECRET
}