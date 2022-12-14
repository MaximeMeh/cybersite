module.exports = {
    HOST: "localhost",
    PORT: "1433",
    USER: "max",
    PASSWORD: "Azerty123",
    DB: "cybersite_db",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      options: { 
        encrypt: true,
        trustServerCertificate: true,
      }
    }
  };