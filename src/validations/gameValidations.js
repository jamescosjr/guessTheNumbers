const Joi = require("joi");

const guessSchema = Joi.object({
    guess: Joi.number().integer().min(1).max(100).required()
});

const validateGuess = (req, res, next) => {
    const { error } = guessSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: "The guess should be between 1 and 100!" });
    }
    next();
};

module.exports = { validateGuess };