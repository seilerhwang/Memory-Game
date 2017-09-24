// List of all cards
var cards = $('.card').map(function() {
    return $(this).children().attr('class');
});

var openCards = [];
var moveCounter = 0;
var starCounter = 5;

// Game is set when page is loaded
$().ready(setGame());

function setGame() {
    $('.container').css('display', 'flex');
    $('.won').css('display', 'none');
    shuffle(cards);
    initialize();
    $('.card').each(function(i) {
        $(this).removeClass('open show match');
        $(this).children().removeClass().addClass(cards[i]);
    });
    return false;
}

// Reset counters
function initialize() {
    moveCounter = 0;
    countMoves();
    starCounter = 5;
    $('.fa-star-o').removeClass().addClass('fa fa-star');
    openCards = [];
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// When a card is clicked, the card is shown. When two cards are clicked, they are compared
$('.card').click(function() {
    if ($(this).hasClass('open') == false) {
        show(this);
        addtoList(this);
        match(this);
        countMoves();
    }
    win();
});

// Game restarts when restart button is clicked
$('.fa-repeat').click(function() {
    restart();
});

// Show clicked card
function show(card) {
    $(card).addClass('open show');
    return false;
}

// Hide cards when mismatched
function hide() {
    setTimeout(function() {
        $('.card').removeClass('open show wrong');
    }, 500);
    return false;
}

// To restart the game, all open cards need to be closed
function restart() {
    $('.card').removeClass('open show match');
    initialize();
    return false;
}

function addtoList(card) {
    openCards.push($(card).children().attr('class'));
}

// Compare two open cards
function match(card) {
    let i = openCards.length - 1;
    if (openCards.length % 2 == 0) {
        if (openCards[i] == openCards[i - 1]) {
            $('.open').addClass('match');
        } else {
            let a = openCards[i].split(' ')[1];
            let b = openCards[i - 1].split(' ')[1];
            $('.' + a).parent().addClass('wrong');
            $('.' + b).parent().addClass('wrong');
            openCards.pop();
            openCards.pop();
            hide();
        }
        moveCounter++;
    }
    return false;
}

// Count how many tries the user attempted and show corresponding stars
function countMoves() {
    $('.moves').html(moveCounter);
    countStars();
}

// Deduct stars depending on how many tries the user attempted
function countStars() {
    if (moveCounter == 10 && starCounter == 5) {
        $('.fa-star').last().removeClass().addClass('fa fa-star-o');
        starCounter--;
    }
    if (moveCounter == 15 && starCounter == 4) {
        $('.fa-star').last().removeClass().addClass('fa fa-star-o');
        starCounter--;
    }
    if (moveCounter == 20 && starCounter == 3) {
        $('.fa-star').last().removeClass().addClass('fa fa-star-o');
        starCounter--;
    }
    if (moveCounter == 25 && starCounter == 2) {
        $('.fa-star').last().removeClass().addClass('fa fa-star-o');
        starCounter--;
        $('.stars-ending').css('display', 'none');
    }
    if (moveCounter == 30 && starCounter == 1) {
        $('.fa-star').last().removeClass().addClass('fa fa-star-o');
        starCounter--;
    }
    $('.stars-result').html(starCounter);
}

// Show that the user has won with a message
function win() {
    if (openCards.length == 16) {
        setTimeout(function() {
            $('.container').css('display', 'none');
            $('.won').css('display', 'flex');
        }, 1000);
    }
}
