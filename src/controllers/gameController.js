const gameService = require("../services/gameService");

const startGame = async (req, res) => {
    try {
        const { level } = req.body;
        const game = await gameService.startGame(level);
        res.status(201).json({ message: "Jogo iniciado!", _id: game._id, attempts: game.attempts });
    } catch (error) {
        res.status(500).json({ error: "Erro ao iniciar o jogo." });
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
        res.status(500).json({ error: "Erro ao processar o palpite." });
    }
};

const getGameStatus = async (req, res) => {
    const { _id } = req.params;

    try {
        const status = await gameService.getGameStatus(_id);
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar status do jogo." });
    }
};

module.exports = { startGame, makeGuess, getGameStatus };