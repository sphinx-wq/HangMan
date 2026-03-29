Key CSS Classes for JavaScript Integration:
Letter Revealing:
.revealed - Apply to .word-letter elements when a letter is guessed correctly
Animation includes a flip effect and color change to green
Button States:
.correct - Apply to letter buttons when guessed correctly (green background, disabled)
.incorrect - Apply to letter buttons when guessed incorrectly (red background, disabled)
.disabled - Apply to disable any button (reduces opacity, removes pointer events)
Game States:
.game-won - Apply to .game-container when player wins
.game-lost - Apply to .game-container when player loses
These classes show/hide the appropriate win/lose message overlays

.correct-final
Apply to letters that were correctly guessed
.incorrect-final
Apply to letters that were NOT guessed (missed letters)

.revealed for hangman parts