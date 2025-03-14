const Game = require("../models/gameModel");

const saveGame = async (gameData) => {
    const game = new Game(gameData);
    try {
        return await game.save();      
    } catch (error) {
        throw error;
    }
};

const findGameById = async (_id) => {
    try {
        return await Game.findById(_id);
    } catch (error) {
        throw error;
    }
};

const updateGame = async (game) => {
    try {
        return await game.save();
    }
    catch (error) {
        throw error;
    }
};

const deleteGame = async (_id) => {
    try {
        return await Game.findByIdAndDelete(_id);
    }
    catch (error) {
        throw error;
    }
};

module.exports = { saveGame, findGameById, updateGame, deleteGame };