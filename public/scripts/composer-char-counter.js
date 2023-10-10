$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    const maxChar = 140;
    const currentChar = $(this).val().length
    const remainingChars = maxChar - currentChar;
    const charCounter = $(this).closest('.new-tweet').find('.counter');

    charCounter.text(remainingChars);

    if (remainingChars < 0) {
      charCounter.addClass('negativeNum');
    } else {
      charCounter.removeClass('negativeNum');
    }
    
  })
});