# Guess The Numbers Game

Welcome to the Guess The Numbers Game! This is a simple game where you can start a new game, make guesses, and check the status of your game.

## API Endpoints

### Start a New Game

**Endpoint:** `POST /`

**Description:** Starts a new game.

**Request Body:**
```json
{
    "level": "easy" // or "medium", "hard"
}
```

**Response:**
```json
{
    "message": "The game has began!",
    "_id": "game_id",
    "attempts": 10,
    "createdAt": "2023-10-01T00:00:00.000Z"
}
```

### Make a Guess

**Endpoint:** `POST /guess/:_id`

**Description:** Makes a guess for the game with the given ID.

**Request Params:**
- `_id`: The ID of the game.

**Request Body:**
```json
{
    "guess": 42
}
```

**Response:**
- On success:
    ```json
    {
        "message": "Congratulations! You've guessed the number!"
    }
    ```
- On failure:
    ```json
    {
        "message": "Incorrect guess. Try again!",
        "remainingAttempts": 9
    }
    ```

### Get Game Status

**Endpoint:** `GET /:_id`

**Description:** Retrieves the status of the game with the given ID.

**Request Params:**
- `_id`: The ID of the game.

**Response:**
```json
{
    "_id": "game_id",
    "attempts": 10,
    "remainingAttempts": 9,
    "createdAt": "2023-10-01T00:00:00.000Z",
    "status": "in-progress" // or "won", "lost"
}
```

## Error Handling

All endpoints may return the following error response in case of an internal server error:
```json
{
    "error": "Error message"
}
```

## Services

The game logic is handled by the `gameService` module, which provides the following functions:
- `startGame(level)`: Starts a new game with the specified difficulty level.
- `makeGuess(_id, guess)`: Processes a guess for the game with the given ID.
- `getGameStatus(_id)`: Retrieves the status of the game with the given ID.

## License

This project is licensed under the MIT License.

Happy guessing!