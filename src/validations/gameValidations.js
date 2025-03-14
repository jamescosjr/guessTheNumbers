const Joi = require("joi");

const guessSchema = Joi.object({
    guess: Joi.number().integer().min(1).max(100).required()
});

const validateGuess = (req, res, next) => {
    const { error } = guessSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: "O palpite deve ser um número entre 1 e 100." });
    }
    next();
};

module.exports = { validateGuess };