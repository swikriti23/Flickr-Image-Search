Flickr-Image-Search
===================

This system provides the user with the ability to refine a search in the Flickr database 


BASIC SETUP

I have used node.js Express, jquery for the Flickr Api Image Search. The dependencies required to run the webpage is -
1. npm install -g express
2. npm install -g express-generator
3. npm install -g flickrapi

Then finally to install all other dependencies -
npm install

HOW TO RUN

Go to the main directory (Assignment1) of the project from the node.js command line -
node ./bin/www
Open http://localhost:3000/ on the web browser

DESIGN DECISIONS

In the first page of the Flickr Image Search user can enter upto 4 fields Search, Username, Upload Since and Upload Until to query the flickrapi and get the results.

1. Datepicker has been used to enter Upload Since and Upload Until.
2. If user does not enter any fields, an error message has been shown to enter the fields.
3. If there are no results for that particular query, it shows a message that "No results Found"
4. If the user queries by entering a username which does not exist, it shows a message that "Invalid Username".
5. There is a Home Button on the top right corner, so as to refresh the page if any of the above messages are shown.
6. If the query entered fetch some results, it is redirected to the other page.

The second page is used to display the results from the query entered in the first page.

1. Only 10 results are shown at a time, with a picture and it's owner profile url below it being displayed.
2. Pictures are in the form of links, if you click on any of them it's url is opened.
3. There is a "More" button in the bottom which on being clicked shows on it 10 more images with their links.
4. If there are no more images for that particular query, the button is disabled and shows "NO more Photos", this is to notify the user that there are no results so that user does not feel confused that why no more pictures are being loaded.
5. There is a home button on the top right corner, if the user clicks on it they can go back to the first page.
