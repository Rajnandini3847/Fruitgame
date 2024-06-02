document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let flippedCard = null;
    let matchesFound = 0;
    const totalMatches = 6; 

    /*const pinkImages = ["url1", "url2", "url3", "url4", "url5", "url6"];

    function getRandomPinkImage() {
        return pinkImages[Math.floor(Math.random() * pinkImages.length)];
    }*/
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('flipped')) {
                return;
            }

            card.classList.add('flipped');

            if (!flippedCard) {
                flippedCard = card;
                return;
            }

            checkForMatch(card, flippedCard);
            flippedCard = null;
        });
    });

    function checkForMatch(card1, card2) {
        const isPinkCard1 = card1.classList.contains('pink-card');
        const isPinkCard2 = card2.classList.contains('pink-card');

        if (isPinkCard1 && isPinkCard2) {
            return;
        }

        if (!isPinkCard1 && !isPinkCard2) {
            return;
        }

        const fruit = isPinkCard1 ? card1.dataset.fruit : card2.dataset.fruit;
        const letter = isPinkCard1 ? card2.dataset.letter : card1.dataset.letter;

        if (fruit[0].toUpperCase() === letter) {
            matchesFound++;
            setTimeout(() => alert("That's a match!"), 500);

            if (matchesFound === totalMatches) {
                setTimeout(() => {
                    window.location.href = 'end_page.html';
                }, 1000);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 1000);
        }
    }
});
