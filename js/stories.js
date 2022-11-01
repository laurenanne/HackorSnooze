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
  return $(`
      <li id="${story.storyId}"><input type="checkbox"/>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
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
  $spanAdd.show();
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

// adds stories to the favorite list from the main page
function userFavoritesClick(evt) {
  $(this).addClass("highlight-fav");
  let username = currentUser.username;
  let storyId = evt.currentTarget.id;
  currentUser.addFavorite(username, storyId);
}
$allStoriesList.on("dblclick", "li", userFavoritesClick);

//removes a favorited story from the favorite list
function removeFavoritesClick(evt) {
  $(this).removeClass("highlight-fav");
  let username = currentUser.username;
  let storyId = evt.currentTarget.id;
  currentUser.removeFavorite(username, storyId);
}
$favoritesList.on("dblclick", "li", removeFavoritesClick);

//refresh page when adding or removing favorites
function refreshStories() {
  location.reload();
}

async function deleteStoryClick(evt) {
  let storyId = evt.currentTarget.id;
  await storyList.deleteStory(storyId);
}

$allStoriesList.on("click", "li", function (evt) {
  $("li").each(function () {
    if ($(this).find("input[type=checkbox]").is(":checked")) {
      deleteStoryClick(evt);
    }
  });
});
