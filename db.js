const mongoose = require("mongoose");

const connectToDB = () => {
  const dbURI =
    process.env.NODE_ENV === "production"
      ? `mongodb+srv://natalialaszczkowskax:${process.env.DB_PASS}@cluster0.7vbtvwi.mongodb.net/adsDB?retryWrites=true&w=majority&appName=Cluster0`
      : "mongodb://0.0.0.0:27017/adsDB";

  mongoose.connect(dbURI, {});
  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to the database");
  });

  db.on("error", (err) => console.log("Error " + err));
};

module.exports = connectToDB;