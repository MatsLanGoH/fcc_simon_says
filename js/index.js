var sequenceCounter = 0;
var attemptsCounter = 0;
var sequence = [];

$(document).ready(function($) {
    // TODO: Remove this stuff
    var testSequence = [1, 2, 3, 1];


    resetSequence();

    lightupButtons(sequence);
    displaySequenceText(sequence);

    $('.simonActionBtn').click(function(event) {
        /* Act on the event */
        var buttonId = $(this).attr('id');
        var input = parseInt(buttonId[buttonId.length - 1]);
        checkSequence(input);
    });
});



function lightupButtons(sequence) {
    // Lights up the action buttons
    // specified in the array.
    var index = 0;
    var actionButton;

    // TODO: Consecutive same colors cannot be seen. Fix this.
    function myLoop() {
        setTimeout(function () {
            if (actionButton) {
                $(actionButton).css('opacity', '');
            }
            actionButton = '#simonActionBtn' + (sequence[index]);
            $(actionButton).css('opacity', '1');
            console.log('Sequence', index, sequence[index], actionButton);
            index++;
            // TODO: I use an extra 'lap' to return opacity to standard value
            // after all values have been displayed. There's gotta be a more
            // elegant solution to this.
            if (index <= sequence.length) {
                myLoop();
            }
        }, 1000);
    }
    myLoop();
}


// Keep track of the following states
// currentSequence length
// strict mode on/off
//
//

function displaySequenceText(sequence, guessed) {
    $('#sequenceOutput').html(sequence);
    $('#guessedOutput').html(guessed);
}

function checkSequence(input) {
    // Remember, it's a sequence, not just a single number!
    if (input == sequence[attemptsCounter]) {
        console.log('Good guess!');
        attemptsCounter++;

    } else {
        console.log('Try again!');
        attemptsCounter = 0;
    }

    if (attemptsCounter == sequence.length) {
        addStep();
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