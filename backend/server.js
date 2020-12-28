const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const URI = process.env.DB_URL

mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Server is connect to DB successfully!");
})

app.use('/exercises', require("./Routes/exercises"));
app.use("/users", require("./Routes/users"));


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})