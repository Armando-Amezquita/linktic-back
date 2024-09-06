module.exports = {
    app: {
      port: 3000,
      corsOrigin: "http://localhost:3000",
      logging: true,
    },
    db: {
      connectionString: "mongodb://localhost:27017/mydb",
    },
    apiKeys: {
      google: "your_google_api_key",
      stripe: "your_stripe_api_key",
    },
  };