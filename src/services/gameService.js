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

    if (game.remainingAttempts <= 0) {
        throw new Error("Suas tentativas acabaram!");
    }

    game.remainingAttempts--;

    if (guess === game.secretNumber) {
        await gameRepository.deleteGame(_id);
        return { message: "Parabéns! Você acertou!", success: true };
    }

    await gameRepository.updateGame(game);
    return {
        message: guess < game.secretNumber ? "Muito baixo! Tente novamente." : "Muito alto! Tente novamente.",
        remainingAttempts: game.remainingAttempts,
        success: false
    };
};

const getGameStatus = async (_id) => {
    const game = await gameRepository.findGameById(_id);
    if (!game) {
        return { remainingAttempts: remainingAttempts, status: "O jogo acabou!", attemptsUsed: attemptsUsed };
    }
    const status = game.remainingAttempts <= 0 ? "Você perdeu! O número era " + game.secretNumber
        : "O jogo está em andamento.";

    const attemptsUsed = game.attempts - game.remainingAttempts;

    return { remainingAttempts: game.remainingAttempts, status: status, attemptsUsed: attemptsUsed };
};

module.exports = { startGame, makeGuess, getGameStatus };