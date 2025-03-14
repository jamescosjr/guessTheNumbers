const gameRepository = require("../repositories/gameRepository");

const startGame = async (level) => {
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    const attemptsByLevel = { "1": 10, "2": 8, "3": 6, "4": 4, "5": 2 };
    const attempts = attemptsByLevel[level] || 6;

    const game = { secretNumber, attempts, remainingAttempts: attempts };
    return await gameRepository.saveGame(game);
};

const makeGuess = async (_id, guess) => {
    const game = await gameRepository.findGameById(_id);
    if (!game) {
        throw new Error("Jogo não encontrado");
    }

    if (game.attempts <= 0) {
        throw new Error("Suas tentativas acabaram!");
    }

    game.attempts--;

    if (guess === game.secretNumber) {
        await gameRepository.deleteGame(_id);
        return { message: "Parabéns! Você acertou!", success: true };
    }

    await gameRepository.updateGame(game);
    return {
        message: guess < game.secretNumber ? "Muito baixo! Tente novamente." : "Muito alto! Tente novamente.",
        remainingAttempts: game.attempts,
        success: false
    };
};

const Game = require("../models/gameModel");

const getGameStatus = async (_id) => {
    const game = await gameRepository.findGameById(_id);
    if (!game) {
        throw new Error("Jogo não encontrado");
    }
    const status = game.attempts <= 0 ? "Você perdeu! O número era " + game.secretNumber
        : "O jogo está em andamento.";

    return { remainingAttempts: game.remainingAttempts, status: status };


};

module.exports = { startGame, makeGuess, getGameStatus };