/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  $("#newTweet").submit(function (event) {
    event.preventDefault();

    const formData = $(this).serialize();

    $.post("/tweets", formData)
      .done(function (response) {
        console.log("Tweet has been submitted", response);
      })
      .fail(function (xhr, status, error) {
        console.log("Error:", status, error);
      });
  });

  const loadTweets = function() {
    $.ajax({
      url:'/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(response) {
        console.log("response", response)
        renderTweets(response);
      },
      error: function(error) {
        console.log("Error message", error);
      }
    });
  }

  loadTweets();
});


const createTweetElement = function (tweet) {
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
    <p class="tweet-text">${text}</p>
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
