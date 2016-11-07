# BitFridge
[![travis][travis-image]][travis-url]

[travis-image]: https://img.shields.io/travis/favian-cyril/BitFridge.svg?style=flat
[travis-url]: https://travis-ci.org/favian-cyril/BitFridge
[![Coverage Status](https://coveralls.io/repos/github/favian-cyril/BitFridge/badge.svg?branch=frg-res)](https://coveralls.io/github/favian-cyril/BitFridge?branch=frg-res)
### Group C
  - 1406546185 - Farras Apsari Putri
  - 1406546134 - Irsyad Nabil
  - 1406546153 - Meta Andrini Utari
  - 1406641621 - Favian Cyrilvarick Amrullah
  - 1406546140 - Abdurrahman Faris Agianda

----------

Introduction
---------

We choose this project because usually people do not prepare or shop for the ingredients
before cooking for everyday needs. They tend to use the ingredients available at home.
Many people also do not remember their favourite recipe by heart, this could lead to
difficulty of finding the suitable recipe for the ingredients. With this app, worry no
more! You can just input all the ingredients you have and the website will find the
perfect recipe for you. The search could also be tailored to match each individual needs.
This app is also ideal for all college students who have limited ingredients for cooking. 

Project Goals
---------

### Goals

**BitFridge** is made to be able to assist the needs of people who want to maximize their ingredients that they have available in their loot. With the help of **BitFridge**, their ingredients can be made into a more meaningful recipe and menu that they are able to make out of it. The essence of **BitFridge** is important, because it will create a sense of awareness and creativity from the user in what to acquire in an efficient manner to perform a good cook in a more proper meal. By having **BitFridge**, one could acquire a sense of beneficiary and habit in their way they go about their cooking. Whether preparing a simple brew or making the most out of a scallop or braise, a **BitFridge** user will have day-to-day cooking as a fun and innovative experience. This will also allow them to have a measured expense on a mere routine basis, with having a stable expenditure on what to buy in order to have a delightful cooking experience.

### User Target
1. **University Students** who have limited ingredients to work with, yet plan to cook
innovative meals that they otherwise would not have made.
2. **Dieters** who are seeking to make their own meals that adhere to their diets.

### Expected Outcome
By the end of the semester, **BitFridge** is expected to be able to take a set of
ingredients provided by the user and return with a list of recipes that contain said
ingredients. **BitFridge** will also come with supporting features to help user find the
right recipe for them, ranging from recommended recipes to search filters.


Project Vision
---------
The vision of this project is to encourage people to eat healthy by cooking with fresh ingredients, also it encourages people to shop for fresh raw ingredients rather than factory made frozen food.
SCRUM Core Team
---------

- **Product Owner:** Farras Apsari Putri
- **SCRUM Team:**
  - *Front-end Developer:* Meta Andrini Utari
  - *Back-end Developer:* Abdurrahman Faris Agianda, Favian Cyrilvarick Amrullah, Irsyad Nabil


--------------


# Our Story behind the Code.


### Overview

What is BitFridge really?
BitFridge is an app that helps to find recipes based on ingredients you have.

How does BitFridge works?
BitFridge contains databases of recipes, and if a certain ingredient is found in it, BitFridge will suggest that recipe for you.

How to use it?
You simply just type in your ingredients, and Bitfridge will give out the recipes.

### Background

We identify that the consumers will be all people affiliated with cooking, regardless of their experience. They need a go-to app to help them to cook. Whether or not ingredients they have are in abundance or limited, the consumers will need BitFridge to ease their work. In BitFridge, We want to deliver a user-friendly and easy to use app.

Our Library
-----------

### Main

In app.js, we call in variables from api, routes, and users. We set a view engine setup. We then configure the app extensions and set error handlers; both development and production. An output of error status 404 will forward it to the error handlers, where it will print out stacktrace.

In gulpfile.js, we bundle all js files. All extensions of js will be bundled here. We return browserify and configure the error message.

### App

We have clientapi.js to give out a temporary baseUrl for development. We use this js file to give out certain functions like searchingredients and add params.

In index.js, we set the route history to the browser history. We also set the route path to components in search container.

### Components

In ErrorMsg.js, we import react, then we export default function of props function, then configure the image for our error right in the center of the dropdown menu.

In IngredientSugestion.js, we import react, then we set export default function from props class, return classes like media ingredient,etc., then set the position of the ingredient suggestion image accordingly.

In Preloader.js we first import react, then export default function empty string, then take image of the spin icon and set variables. We then set the position of the image right in the center.

In SearchBar.js, we are using react again. We first export default class SearchBar extends with a react component. We set the constructor class by binding handleChange, handleFocus, and handleBlur, with the component.
We set the handleChange class by var searchQuery, then classes handleFocus and handleBlur to check if props is setFocus or not. We set a render class to render components with the handle classes.

In SuggestionsList.js, we use react, as we all do for all our components files. First, we import searchingredients, ingredientsuggestion, errormsg, preloader. We then export default class suggestionslist then extends with a react component. Constructor props class is called to bind all files. We create a class called componentWillReceiveProps to configure if the props search text is unsimilar to the next props search text, we will go to handlesearch class. In handlesearch class, we set if the length of a search text is longer than 1 string, we will clear results and errtype, and will set loading to true for icons. We then create a timestamp by fetching results based on last timestamp. Fetch result is done firtsly by making API calls, then set typerror, serveerror, other unhandled error, and it will check timestamp, and if request is not stale it will accept result. Then we check if request has returned any results. This will clear the loading icon if no error is found. Then we set loadresultslist, processresults, and render classes. It is for loading images and results list, process any search input and give out response, and to open focused search props and give results of the processresults and return dropdown clearfix added by status of it, respectively.

### Containers

In SearchContainers.js we set the outer search page. We want to import react, searchbar, suggestionslist and debounce first. We first make a class to configure the react component with the handleinput and handlefocus classes to then render it. We then set the return to give out the container output, and set debounce time to 400ms when onInput. We set the debounce onto the searchbar, also setting if suggestionslist is onfocused or not.

### Modules

We set a js file name apicalls.js to have configure our API. We first must request the API and also append them. We are using the spoonacular API for our project. We perform ingredient search with ingredient metadata. The callback will receive the spoonacular url. The wrapper get function uses the 'request' library and will call the callback using the JSON.pars and will response with status code '200.

### Routers

In index.js, we set the router to get the home page. From the express.router, it will response with a render of index with title 'express'. The module exported is router.

In users.js, we also set the router to require 'express'. The router will get users listing, and response by sending 'response with a resource'. The module exported here is also router.

In api.js, other than the above methods which are the same, we also needed apicalls and searchingredients. We first set the router to get the function searchingredients. Then we set if it shows an error. And if its error, it will give our status code '500', if not response status of '200'.

### Testing

We test the searchcontainer in searchcontainer-test.js. In it we imported sinon and modules from components. We then import jsdom. We use the describe class in searchcontainer. We then check if the searchcontainer contains searchbar and suggestionlist. Then, we check it should change state when handleInput is called. We check also it it should change the state when the handleFocus is called. Then we check the searchbar. Does it have an input form or not. We also check suggestionlist to check whether it show suggestionlist when a text is parsed. We check it and if a preloader, or error message is not shown, then error type '200' is shown. We check ingredientssuggestion and if title and image not shown, then an error will be shown.

We also test apicalls.js in apicalls-tests.js. Importing sinon first and the apicalls module, we also need to import events,etc. for testing this. We first check if the server searchingredient should call get, if not error. The we check if it should call request, if not error ass well. We assert them in sinon then.

In clientapi-test.js, we test the clientapi.js. We first check whether the client searchingredients has called get. If not called, then error. We also check whether it should call request.get function, if not error. we then restore mock and assert them to sinon.

### Others

We use glyphicons halflings regular fonts. We store loading and error icons in public files. We also store a jquery and bootstrap js and css files in the public files.



