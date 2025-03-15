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
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false,
        default: Date.now
        }
    }, 
    {
        timestamps: true
    });   

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;