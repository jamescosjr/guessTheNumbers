require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/gameRoutes");

const corsOptions = {
    origin: "http://localhost:3000", // Specify the allowed origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors(corsOptions));
app.use("/games", router);

if (process.env.NODE_ENV !== "test") {
    mongoose.connect(process.env.MONGO_URL, {})
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("Failed to connect to MongoDB", err);
        });

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

module.exports = app;