const express = require("express");
const { startGame, makeGuess, getGameStatus } = require("../controllers/gameController");
const { validateGuess } = require("../validations/gameValidations");

const router = express.Router();

router.post("/", startGame);
router.post("/:_id/guess", validateGuess, makeGuess);
router.get("/:_id", getGameStatus);

module.exports = router;
