const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const Users = require('./models/usersModels');

dotenv.config({ path: "./config.env" });

// Middleware
// app.use(cors());

// MongoDB Connection
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const testUser = new Users({
    firstName: "Taylor",
    lastName: "Swift",
    email: "taylorswift@gmail.com",
    username: "taylorswift",
    password: "12345"
})

testUser.save().then(doc => {console.log(doc)}).catch(err => {console.log(err)});

// Define Routes
// app.use("/api", require("./routes/api"));

app.listen(PORT, () => console.log("App booted..."));
