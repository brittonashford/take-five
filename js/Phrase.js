class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
    * Display phrase on game board
    */
    addPhraseToDisplay() {
        const charArr = this.phrase.split("");
        const phraseDiv = document.querySelector('#phrase');
        const phraseUL = phraseDiv.firstElementChild;

        for (let i = 0; i < charArr.length; i++) {
            let charItem = document.createElement('li');
            charItem.innerHTML = charArr[i];

            if (charArr[i] === " ") {
                charItem.classList.add('space');
            } else {
                charItem.classList.add('hide')
                charItem.classList.add('letter')
                charItem.classList.add(`${charArr[i]}`);
            }

            phraseUL.appendChild(charItem);
        }
    }

    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(letter) {
        return document.querySelector(`.${letter}`);
    }

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        let matched = document.querySelectorAll(`.${letter}`);
        if (matched) {
            for (let i = 0; i < matched.length; i++) {
                matched[i].classList.remove('hide');
                matched[i].classList.add('show');
            }
        }
    }
}