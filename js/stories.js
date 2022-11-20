"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  // checks to see if the story is on the fav list and if so it adds the class true
  const favs = currentUser.favorites;
  let isFavorite = false;

  for (let i = 0; i < favs.length; i++) {
    if (favs[i].storyId === story.storyId) {
      isFavorite = !isFavorite;
    }
  }
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <button id="fav-btn" class = ${isFavorite}>&#x2665;</button>
        <button id ="del-btn">Delete</button>
        </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Handle story form submission. */
async function getNewStory(evt) {
  evt.preventDefault();

  const author = $("#story-author").val();
  const title = $("#story-title").val();
  const url = $("#story-url").val();

  const newStoryObj = { author, title, url };
  await storyList.addStory(currentUser, newStoryObj);

  $storyForm.trigger("reset");
  $allStoriesList.show();
}

$storyForm.on("submit", getNewStory);

/** Gets list of favorites from server, generates their HTML, and puts on page. */
function putFavoritesOnPage() {
  $favoritesList.empty();

  let favoriteItems = currentUser.favorites;
  let uniqueFavs = [...new Set(favoriteItems)];

  // loop through favorites stories and generate HTML for them
  for (let fav of uniqueFavs) {
    const $fav = generateStoryMarkup(fav);
    $favoritesList.append($fav);
  }

  $favoritesList.show();
}

// adds or removes stories to the favorite list from the main page
function userFavoritesClick(evt) {
  let username = currentUser.username;
  let storyId = evt.target.parentElement.id;
  if (evt.target.classList.contains("true")) {
    currentUser.removeFavorite(username, storyId);
  } else {
    currentUser.addFavorite(username, storyId);
  }
}
//create click event for both buttons
$allStoriesList.on("click", function (evt) {
  if (evt.target.id === "fav-btn") {
    userFavoritesClick(evt);
  } else {
    deleteStoryClick(evt);
  }
});

//refresh page when adding or removing favorites
function refreshStories() {
  location.reload();
}

async function deleteStoryClick(evt) {
  let storyId = evt.target.parentElement.id;
  await storyList.deleteStory(storyId);
}
