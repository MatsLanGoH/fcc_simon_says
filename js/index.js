// TODO: Clean up console.log entries.
// TODO: DRY your code.

var sequenceCounter = 0;
var attemptsCounter = 0;
var sequence = [];
var strict = false;
var gameActive = true;

// Button Sound playback
var baseUrl = "https://s3.amazonaws.com/freecodecamp/simonSound";
var audio = ['1.mp3', '2.mp3', '3.mp3', '4.mp3'];

$(document).ready(function($) {
    // TODO: Remove this stuff
    var testSequence = [1, 2, 3, 1];

    initializeGame();

    $('.simonActionBtn').click(function(event) {
        if (gameActive) {
            /* Act on the event */
            var buttonId = $(this).attr('id');
            var input = parseInt(buttonId[buttonId.length - 1]);
            playSound(input);
            checkSequence(input);
        }
    });

    $('#startButton').click(function(event) {
        /* Act on the event */
        gameActive = true;
        startGame();
    });

    $('#strictSwitch').click(function(event) {
        /* Act on the event */
        toggleStrict();
    });

    $('#powerToggle').click(function(event) {
        /* Act on the event */
        console.log('Log: Pushed Power Button.');
    });

});



function lightupButtons(sequence) {
    // Lights up the action buttons
    // specified in the array.
    var index = 0;
    var actionButton;

    // TODO: Consecutive same colors cannot be seen. Fix this.
    // Maybe it would be better  (and simpler) to define a
    // button animation in CSS,
    // then toggle this animation from JS.
    function myLoop() {
        setTimeout(function () {
            if (actionButton) {
            //     // $(actionButton).css('opacity', '');
            //     // $(actionButton).css('animation-play-state', 'paused');
                $(actionButton).removeClass('lightsOn');
            }
            actionButton = '#simonActionBtn' + (sequence[index]);
            // $(actionButton).css('animation-play-state', 'running');
            // $(actionButton).css('animation', '');
            $(actionButton).addClass('lightsOn');
            console.log('Sequence', index, sequence[index], actionButton);
            playSound(sequence[index]);
            index++;
            // TODO: I use an extra 'lap' to return opacity to standard value
            // after all values have been displayed. There's gotta be a more
            // elegant solution to this.
            if (index <= sequence.length) {

                myLoop();
            }
        }, 900);
    }
    myLoop();
}


function playSound(num) {
    if (num) {
        // console.log('Playing sound, https://s3.amazonaws.com/freecodecamp/simonSound' + num + '.mp3');
        new Audio(baseUrl + audio[num - 1]).play();
    }
}


function displaySequenceText(sequence, guessed) {
    $('#sequenceOutput').html('Current sequence ' + sequence);
    if (guessed) {
        $('#guessedOutput').append(' ' + guessed);
    }

    $('#repeatSwitch').html(sequence.length);

    // TODO: Separate responsibilities.
    // Should display function check for win condition?
    if (sequence.length > 20) {
        $('#gameMessage').html('You won!');
        gameActive = false;
    }
}

function checkSequence(input) {
    // Remember, it's a sequence, not just a single number!
    if (input == sequence[attemptsCounter]) {
        $('#gameMessage').html(input + '? ' + 'Good guess!');
        attemptsCounter++;

    } else {
        $('#gameMessage').html('Wrong guess! Try again!');
        attemptsCounter = 0;

        if (strict) {
            console.log('Too bad! Strict game!');
            initializeGame();
        }
    }

    if (attemptsCounter == sequence.length) {
        addStep();
        attemptsCounter = 0;
        lightupButtons(sequence);
        displaySequenceText(sequence, input);
    }

    // alert('Got it');
    // if (value === sequence[index]) {
    //     addStep(sequence);
    //     sequenceCounter++;
    //     attemptsCounter++;
    // } else {
    //     resetSequence(sequence);
    //     sequenceCounter = 0;
    //     attemptsCounter = 0;
    // }
}

function resetSequence() {
    sequenceCounter = 0;
    // TODO: Remove testing sequence
    sequence = [];
    addStep();
}

function addStep() {
    sequence.push(getRandomIntInclusive(1, 4));
}

function getRandomIntInclusive(min, max) {
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function initializeGame() {
    resetSequence();

    lightupButtons(sequence);
    displaySequenceText(sequence);
}

function startGame() {
    // body...
    initializeGame();
}


function toggleStrict() {
    if (strict) {
        strict = false;
    } else {
        strict = true;
    }
    console.log('Log: Toggled Switch Button.', strict);
}
