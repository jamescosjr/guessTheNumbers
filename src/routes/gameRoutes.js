// const express = require("express");
const Router = require("express").Router;
const { startGame, makeGuess, getGameStatus } = require("../controllers/gameController");
const { validateGuess } = require("../validations/gameValidations");

const router = Router();

router.post("/", startGame);
router.post("/guess/:_id", validateGuess, makeGuess);
router.get("/:_id", getGameStatus);

module.exports = router;
