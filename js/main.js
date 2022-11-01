"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

const $navSubmit = $(
  '<a class="hidden nav-link" href="#" id="submit">submit</a>'
);
$(".navbar-brand").append($navSubmit);

const $navFavorites = $(
  '<a class="hidden nav-link" href="#" id="click">favorites</a>'
);
$(".navbar-brand").append($navFavorites);

const $favoritesList = $('<ol id="fav-stories-list" class="fav-stories"></ol>');

$(".stories-container").append($favoritesList);

const $spanAdd = $(
  "<span class='hidden'> Double Click to Add to Favorites</span><span class='hidden'> Click the Checkbox to Delete a Story</span>"
);
$(".stories-container").prepend($spanAdd);

const $spanRemove = $(
  "<span class='hidden'> Double Click to Remove Favorite</span>"
);
$(".stories-container").prepend($spanRemove);

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $storyForm,
    $favoritesList,
    $spanAdd,
    $spanRemove,
  ];
  components.forEach((c) => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn(
  "HEY STUDENT: This program sends many debug messages to" +
    " the console. If you don't see the message 'start' below this, you're not" +
    " seeing those helpful debug messages. In your browser console, click on" +
    " menu 'Default Levels' and add Verbose"
);
$(start);
