/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const $tweet = createTweetElement(tweetData);
  $("#tweets-container").append($tweet);
});

let tweetData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const createTweetElement = function (tweet) {
  const { name, handle, avatars } = tweet.user;
  const { text } = tweet.content;
  const dateCreated = tweet.created_at;
  return $(`
  <article class="tweet">
    <header class="tweet-header">
      <div>
        <i class="fa-solid fa-face-smile"></i>
        ${name}
      </div>
      <span class="account">${handle}</span>
    </header>
    <p class="tweet-text">${text}</p>
    <footer class="tweet-footer">
      ${dateCreated}
      <div class="icons">
        <button class="retweet"><i class="fa-solid fa-retweet"></i></button>
        <button><i class="fa-solid fa-flag"></i></button>
        <button><i class="fa-solid fa-heart"></i></button>
      </div>
    </footer>
  </article>
  `);
};
