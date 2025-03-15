const gameService = require("../services/gameService");

const startGame = async (req, res) => {
    try {
        const { level } = req.body;
        const game = await gameService.startGame(level);
        res.status(201).json({ message: "The game has began!", _id: game._id, attempts: game.attempts, createdAt: game.createdAt });
    } catch (error) {
        res.status(500).json({ error: "Error to start a game" });
    }
};

const makeGuess = async (req, res) => {
    const { _id } = req.params;
    const { guess } = req.body;

    try {
        const result = await gameService.makeGuess(_id, guess);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(200).json({ message: result.message, remainingAttempts: result.remainingAttempts });
        }
    } catch (error) {
        res.status(500).json({ error: "Error to process a guess" });
    }
};

const getGameStatus = async (req, res) => {
    const { _id } = req.params;

    try {
        const status = await gameService.getGameStatus(_id);
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ error: "Error to fetch a status" });
    }
};

module.exports = { startGame, makeGuess, getGameStatus };