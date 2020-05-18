/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var WIN_SCORE = 100;

var scores, roundScore, activePlayer, gamePlaying, prevDice;
var diceDom;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        var currScore = document.querySelector('#current-' + activePlayer);
        var totalScore = document.getElementById('score-' + activePlayer)

        if (dice !== 1) {
            if (dice === 6 && prevDice === 6) {

            }
            roundScore += dice;
            currScore.textContent = roundScore;
        } else {
            currScore.textContent = '0';
            switchPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        var scoreActivePlayer = document.querySelector('#score-' + activePlayer);
        scores[activePlayer] += roundScore;
        scoreActivePlayer.textContent = scores[activePlayer];

        if (scores[activePlayer] >= WIN_SCORE) {
            document.getElementById("name-" + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            document.getElementById('current-' + activePlayer).textContent = '0';
            hideDice();
            switchPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function switchPlayer() {
    var nextPlayer = 1 ^ activePlayer;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' + nextPlayer + '-panel').classList.add('active');
    activePlayer = nextPlayer;
    roundScore = 0;
}

function hideDice() {
    diceDom.style.display = 'none';
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    prevDice = 0;
    gamePlaying = true;

    diceDom = document.querySelector('.dice');

    hideDice();

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
}