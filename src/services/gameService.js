const gameRepository = require("../repositories/gameRepository");

const startGame = async (level) => {
    await gameRepository.deleteGamesWithMoreThan24Hours();
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    const attemptsByLevel = { "1": 10, "2": 8, "3": 6, "4": 4, "5": 2 };
    const attempts = attemptsByLevel[level] || 6;
    const createdAt = new Date();

    const game = { secretNumber, attempts, remainingAttempts: attempts, createdAt };
    return await gameRepository.saveGame(game);
};

const makeGuess = async (_id, guess) => {
    const game = await gameRepository.findGameById(_id);
    if (!game) {
        throw new Error("Game not found");
    }

    if (game.remainingAttempts <= 0) {
        throw new Error("Game over");
    }

    game.remainingAttempts--;

    if (guess === game.secretNumber) {
        game.remainingAttempts = 0;
        game.status = "won";
        await gameRepository.updateGame(game);
        return { message: "Congratulations! You won!", success: true };
    }

    await gameRepository.updateGame(game);
    return {
        message: guess < game.secretNumber ? "Too low! Try again." : "Too high! Try again.",
        remainingAttempts: game.remainingAttempts,
        success: false
    };
};

const getGameStatus = async (_id) => {
    const game = await gameRepository.findGameById(_id);
    if (!game) {
        throw new Error("Game not found");
    }

    let status;
    switch (true) {
        case game.status === "won":
            status = "Congratulations! You won!";
            break;
        case game.remainingAttempts <= 0:
            status = "You lose! The number was " + game.secretNumber;
            break;
        default:
            status = "The game is in progress.";
            break;
    }

    const attemptsUsed = game.attempts - game.remainingAttempts;

    return { remainingAttempts: game.remainingAttempts, status: status, attemptsUsed: attemptsUsed };
};

module.exports = { startGame, makeGuess, getGameStatus };