class Game{
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
    */
    createPhrases() {
        const phraseArr = [
            "John Coltrane",
            "Django Reinhardt",
            "Eric Dolphy",
            "Duke Ellington",
            "Ella Fitzgerald",
            "Billie Holiday",
            "Oscar Peterson",
            "Charles Mingus",
            "Charlie Parker",
            "Wes Montgomery",
            "Grant Green",
            "Miles Davis",
            "McCoy Tyner",
            "Cannonball Adderley",
            "Herbie Hancock",
            "Bill Evans"
        ]

        const phraseObjArr = [];

        phraseArr.forEach(phrase => phraseObjArr.push(new Phrase(phrase)));

        return phraseObjArr;
    }

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        const randomPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];

        return randomPhrase;
    };

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        const qwertyBtns = document.querySelectorAll('.key');
        const overlay = document.getElementById('overlay');

        /*reset qwerty key classes*/
        for (let i = 0; i < qwertyBtns.length; i++) {
            qwertyBtns[i].removeAttribute('class');
            qwertyBtns[i].className = 'key';
            qwertyBtns[i].disabled = false;
        }

        /* reset lives */
        const lives = document.getElementsByTagName('img');

        for (let i = 0; i < lives.length; i++) {
            lives[i].src = 'images/liveHeart.png';
        }

        /* remove old placeholder squares */
        const phraseDiv = document.querySelector('#phrase');
        const phraseUL = phraseDiv.firstElementChild;

        phraseUL.innerHTML = '';

        /* remove overlay */
        overlay.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };

    /**
    * Handles onscreen keyboard button clicks
    * @param (letter) button - The clicked letter button element
    */
    handleInteraction(letter) {
        const qwertyBtns = document.querySelectorAll('.key');

        if (this.activePhrase.checkLetter(letter)) {

            for (let i = 0; i < qwertyBtns.length; i++) {
                if (qwertyBtns[i].innerHTML === letter) {
                    qwertyBtns[i].disabled = true;
                    qwertyBtns[i].classList.add('chosen');
                }
            }

            this.activePhrase.showMatchedLetter(letter)

            if (this.checkForWin()) {
                this.gameOver(true);
            }

        } else {

            for (let i = 0; i < qwertyBtns.length; i++) {
                if (qwertyBtns[i].innerHTML === letter) {
                    qwertyBtns[i].disabled = true;
                    qwertyBtns[i].classList.add('wrong');
                }
            }

            this.removeLife();
        }      
    };

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() {
        if (!document.querySelector('.hide')) {
            return true;
        } else {
            return false;
        }

    };

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        const lives = document.getElementsByTagName('img');
        const imgSrc = lives[4].src;

        /* update heart icons left to right*/
        for (let i = 0; i < lives.length; i++) {

            if (lives[i].src === imgSrc) {
                lives[i].src = "images/lostHeart.png";
                this.missed++;

                if (this.missed === 5) {
                    this.gameOver(false)
                }
                break;
            }
        }
    };

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        const overlay = document.getElementById('overlay');
        const gameOverMsg = document.getElementById('game-over-message');
        const resetBtn = document.getElementById('btn__reset');

        overlay.style.display = '';

        if (gameWon) {
            overlay.className = 'win';
            gameOverMsg.innerHTML = 'Congratulations! You guessed correctly!'
            resetBtn.innerHTML = 'Play Again';
        } else {
            overlay.className = 'lose';
            gameOverMsg.innerHTML = "You lose. Better luck next time."
            resetBtn.innerHTML = 'Try Again';
        }            
    };

}