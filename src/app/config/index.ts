import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};

// NODE_ENV=development
// PORT=5000
// DATABASE_URL=mongodb+srv://admin-um:DUzcnjyjHRYVn6DZ@cluster0.elqsdp0.mongodb.net/first-project?retryWrites=true&w=majority&appName=Cluster0
// BCRYPT_SALT_ROUNDS=12
// DEFAULT_PASS=phuniversity!@#
// JWT_ACCESS_SECRET=879b5fa550376836d324f4ab887d58f50ed3ceb76b6b1b3e1f0cd2d0d6e0d96a
// # require('crypto').randomBytes(32).toString('hex') node like ber kora lagbe uporer ta
// JWT_REFRESH_SECRET=a0bda296223eb3be7d41a23cf36b79d8b56bccc9877b04c29d831d214de9082b18040ea5cfa266e0c73d533098e2bd1eea2c226f1d7e0a1c48775b00a14121fd
// # > require('crypto').randomBytes(64).toString('hex')
// JWT_ACCESS_EXPIRES_IN=1d
// JWT_REFRESH_EXPIRES_IN=365d
