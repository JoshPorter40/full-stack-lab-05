var sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 
    'Too ato too nOt enot one totA not anot tOO aNot', // sentences that we type 
    'oat itain oat tain nate eate tea anne inant nean', 
    'itant eate anot eat nato inate eat anot tain eat', 
    'nee ene ate ite tent tiet ent ine ene ete ene ate'];
var sentenceIndex = 0;
var letterIndex = 0;
var errorCount = 0;
var startTime;

var currentSentence = sentences[0];
var currentLetter = currentSentence.charAt(0);

$('#keyboard-upper-container').hide();
$('#sentence').text(currentSentence);
$('#target-letter').text(currentLetter);

$(document).keydown(function (event) {
    if(event.which === 16) {
        $('#keyboard-lower-container').hide();
        $('#keyboard-upper-container').show();
    } 
    
});

$(document).keyup(function (event){
    if (event.which === 16) {
        $('#keyboard-upper-container').hide();
        $('#keyboard-lower-container').show();
    }
    $('.key').removeClass('highlighted');
});

$(document).keypress(function(event) {
    console.log(event.which);
    $('#' + event.which).addClass('highlighted');
    if (!startTime) { // Go in here if startTime does not have a value
        startTime = event.timeStamp;
    } 

    if (event.which === currentLetter.charCodeAt(0)) {
        $('#feedback').append('<span class ="glyphicon glyphicon-ok"></span>');
    } else {
        $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
        errorCount++;
    }

    letterIndex++;

    if (letterIndex === currentSentence.length) { // if we are at the end of the current sentence
        // move on to the next sentence
        sentenceIndex++;

        if (sentenceIndex === sentences.length) {// we are out of sentences; done
            // end of game, cmpute wpm, show alert, etc
            var enTime = event.timeStamp;
            var elapsedMinutes = (endtime - startTime) / (60 * 1000);
            var wpm = 54 / elapsedmintues - 2 * errorCount;
            $("#feedback").text('You scored ' + wpm + ' words per minutee.');
            setTimeout(function (){
                // do sometihng
                if (confirm('Would you like to play again?')) {
                    sentenceIndex = 0;
                    letterIndex = 0;
                    currentSentence = sentences[0];
                    currentLetter = currentSentence.charAt(0);
                    $('#sentence').text(currentSentence);
                    $('#target-letter').text(currentLetter);
                    
                    startTime = undefined;
                }
            }, 2000);
        } else {
            // there is at least one more sentence
            // move on to the next sentence
            currentSentence = sentences[sentenceIndex];
            $('#sentence').text(currentSentence);
            // reset the letter back to the first position
            letterIndex = 0;
            currentLetter = currentSentence.charAt(letterIndex);
            $('#target-letter').text(currentLetter);
            // Clear out the feedback div(checks and X's)
            $('#feedback').empty();
            $('#yellow-block').css('left', '15px');
            startTime = undefined;
        }
    } else {
        // not at the end of the sentence
        currentLetter = currentSentence.charAt(letterIndex);
        $('#target-letter').text(currentLetter);
        $('#yellow-block').css('left', '+=17.5px');
    }
});

