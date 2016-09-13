$(document).ready(function($) {

    var testSequence = [1, 2, 3, 1];
    lightupButtons(testSequence);
});


function lightupButtons(sequence) {
    // Lights up the action buttons
    // specified in the array.
    var index = 0;
    var actionButton;

    function myLoop() {
        setTimeout(function () {
            if (actionButton) {
                $(actionButton).css('opacity', '');
            }
            actionButton = '#simonActionBtn' + (index + 1);
            $(actionButton).css('opacity', '1');
            console.log('Sequence', index, sequence[index]);
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

