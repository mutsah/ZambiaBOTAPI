import 'dotenv/config';

import sql from 'mssql';

const dbConfig = {
  user: process.env.DB_USERNAME_MSSQL,
  password: process.env.DB_PASSWORD_MSSQL,
  server: process.env.DB_HOST_MSSQL,
  database: process.env.DB_NAME_MSSQL,
  port: parseInt(process.env.DB_PORT_MSSQL, 10),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log('✅ Connected to SQL Server');
    return pool;
  })
  .catch((err) => {
    console.error('❌ Database Connection Failed!', err);
    throw err;
  });

export { sql };
