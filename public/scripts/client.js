/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const displayError = function (errorMessage) {
    const $errorElement = $('.error-message');
    $errorElement.text(errorMessage);
    $errorElement.slideDown();
  };

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log("response", response);
        renderTweets(response);
      },
      error: function (error) {
        console.log("Error message", error);
      },
    });
  };

  loadTweets();

  $("#newTweet").submit(function (event) {
    event.preventDefault();

    const formData = $(this).serialize();

    const tweetText = $('#tweet-text').val();

    const clearTweetTextArea = $('#tweet-text').val('');

    if (tweetText === "" || tweetText === null) {

      const error_message = "Tweet cannot be empty. Please type something before clicking submit."
      displayError(error_message);
      $('#tweet-text').on('focus', function() {
        $('.error-message').slideUp();
      });

    } else if (tweetText.length > 140) {
      const error_message = "Tweet content exceeds 140 characters. Please submit a shorter tweet."
      displayError(error_message);
      $('#tweet-text').on('focus', function() {
        $('.error-message').slideUp();
      });

    } else {
      $.post("/tweets", formData)
        .done(function (response) {
          console.log("Tweet has been submitted", response);
          $("#tweets-container").empty();
          $('.counter').html(140);
          loadTweets();
          clearTweetTextArea;
        })
        .fail(function (xhr, status, error) {
          console.log("Error:", status, error);
        });
    }
  });
});

const createTweetElement = function (tweet) {
// Escape function to prevent users from typing HTML that will affect the web app.
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const { name, handle, avatars } = tweet.user;
  const { text } = tweet.content;
  const dateCreated = tweet.created_at;
  let $tweet = $(`
  <article class="tweet">
    <header class="tweet-header">
      <div>
        <img src="${avatars}">
        ${name}
      </div>
      <span class="account">${handle}</span>
    </header>
    <p class="tweet-text">${escape(text)}</p>
    <footer class="tweet-footer">
      ${timeago.format(dateCreated)}
      <div class="icons">
        <button class="retweet"><i class="fa-solid fa-retweet"></i></button>
        <button><i class="fa-solid fa-flag"></i></button>
        <button><i class="fa-solid fa-heart"></i></button>
      </div>
    </footer>
  </article>
  `);
  return $tweet;
};

const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    const renderedTweet = createTweetElement(tweet);
    $("#tweets-container").prepend(renderedTweet);
  }
};
