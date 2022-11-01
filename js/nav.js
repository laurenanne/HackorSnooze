"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
  $navSubmit.show();
  $navFavorites.show();
  $spanAdd.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();

  hidePageComponents();
  $allStoriesList.show();
  $navSubmit.show();
  $navFavorites.show();
  $spanAdd.show();
}

// Show form on click of button to handle story submission
function navSubmitForm(evt) {
  evt.preventDefault();
  hidePageComponents();
  $storyForm.show();
}

$navSubmit.on("click", navSubmitForm);

//html for the story form
const $storyForm =
  $(`<form action="#" id="story-form" class="account-form hidden" method="post">
  <h4>Story</h4>
  <div class="story-input">
    <label for="author">author</label>
    <input id="story-author" type="text">
  </div>
  <div class="story-input">
    <label for="story-title">title</label>
    <input id="story-title" type="text">
  </div>
  <div class="story-input">
  <label for="story-url">URL</label>
  <input id="story-url" type="url">
</div>
  <button type="submit-story">submit</button>
  <hr>
</form>`);

$(".account-forms-container").append($storyForm);

//adds favorites to the nav bar when logged in
function navFavoritesClick(evt) {
  hidePageComponents();
  $favoritesList.show();
  $spanRemove.show();
  putFavoritesOnPage();
}

$navFavorites.on("click", navFavoritesClick);
