module.exports = {
    HOST: "localhost",
    PORT: "1434",
    USER: "GP1",
    PASSWORD: "1234",
    DB: "cybersite_db",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };