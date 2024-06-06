document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let flippedCard = null;
    let matchesFound = 0;
    const totalMatches = 6;
    let wrongMovesLeft = 6;

    const wrongMovesLeftButton = document.createElement('button');
    wrongMovesLeftButton.textContent = `Wrong Moves Left: ${wrongMovesLeft}`;
    wrongMovesLeftButton.style.position = 'absolute';
    wrongMovesLeftButton.style.top = '10px';
    wrongMovesLeftButton.style.right = '10px';
    document.body.appendChild(wrongMovesLeftButton);

    const popup = document.getElementById('match-popup');
    const closePopupButton = document.getElementById('close-popup');

    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

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
            setTimeout(() => {
                popup.style.display = 'flex';
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 2000); // Close the popup after 2 seconds
            }, 500);

            if (matchesFound === totalMatches) {
                setTimeout(() => {
                    window.location.href = 'end_page.html';
                }, 1000);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                wrongMovesLeft--;
                wrongMovesLeftButton.textContent = `Wrong Moves Left: ${wrongMovesLeft}`;
                if (wrongMovesLeft === 0) {
                    setTimeout(() => {
                        window.location.href = 'loss_page.html';
                    }, 500);
                }
            }, 1000);
        }
    }
});
