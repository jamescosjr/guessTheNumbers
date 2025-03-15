const Game = require("../models/gameModel");

const saveGame = async (gameData) => {
    const game = new Game(gameData);
    try {
        return await game.save();      
    } catch (error) {
        throw error;
    }
};

const deleteGamesWithMoreThan24Hours = async () => {
    try {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return await Game.deleteMany({ createdAt: { $lt: date } });
    } catch (error) {
        throw error;
    }
}

const findGameById = async (_id) => {
    try {
        return await Game.findById(_id);
    } catch (error) {
        throw error;
    }
};

const updateGame = async (game) => {
    try {
        await Game.updateOne({ _id: game._id }, { $set: { updatedAt: new Date() } });

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

module.exports = { saveGame, findGameById, updateGame, deleteGame, deleteGamesWithMoreThan24Hours };