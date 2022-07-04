let game;
const startBtn = document.getElementById('btn__reset');

/* Starts (and resets) game */
startBtn.addEventListener('click', e => {
    const wrongQwerty = document.querySelectorAll('.wrong');
    const chosenQwerty = document.querySelectorAll('.chosen');

    game = new Game();
    game.startGame();
});
    
const qwertyBtns = document.querySelectorAll('.key');

for (let i = 0; i < qwertyBtns.length; i++) {
    qwertyBtns[i].addEventListener('click', e => {
        let letter = e.target.innerHTML;
        game.handleInteraction(letter);
    });
};