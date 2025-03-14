const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    secretNumber: {
        type: Number,
        required: true
    },
    attempts: {
        type: Number,
        required: true
    },
    remainingAttempts: {
        type: Number,
        required: true
    }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;