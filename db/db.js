const path = require("path");
const mongoose = require("mongoose");
const certFilePath = path.join(__dirname, "/mongo-cert.crt");
class Database {
  // Singleton
  connection = mongoose.connection;

  constructor() {
    try {
      this.connection
        .on("open", console.info.bind(console, "Database connection: open"))
        .on("close", console.info.bind(console, "Database connection: close"))
        .on(
          "disconnected",
          console.info.bind(console, "Database connection: disconnecting")
        )
        .on(
          "disconnected",
          console.info.bind(console, "Database connection: disconnected")
        )
        .on(
          "reconnected",
          console.info.bind(console, "Database connection: reconnected")
        )
        .on(
          "fullsetup",
          console.info.bind(console, "Database connection: fullsetup")
        )
        .on("all", console.info.bind(console, "Database connection: all"))
        .on("error", console.error.bind(console, "MongoDB connection: error:"));
    } catch (error) {
      console.error(error);
    }
  }

  async connect({ username, password, dbname }) {
    try {
      const client = await mongoose.connect(
        // `mongodb+srv://${username}:${password}@mongo-tutorial-cluster.cwo1r.mongodb.net/${dbname}?retryWrites=true&w=majority`,
        `${process.env.DB_CONN_STRING}`,
        {
          tlsCAFile: certFilePath,
          tls: true,
          dbName: "voice-chat-db",
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new Database();
