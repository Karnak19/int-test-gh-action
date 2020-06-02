require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 4000;
const sequelize = require("./sequelize");

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello world !"));

// Routes
app.use("/users", require("./routes/users.route.js"));

async function main() {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log("Connection successful to database.");
    app.listen(PORT, (err) => {
      if (err) {
        throw new Error("Something bad happened ...");
      }
      console.log(`Listening to ${PORT}.`);
    });
  } catch (err) {
    console.error("Unable to reach database: ", err);
  }
}

if (process.env.NODE_ENV !== "test") {
  main();
}

module.exports = app;
