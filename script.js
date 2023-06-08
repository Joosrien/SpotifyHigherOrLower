var myHeaders = new Headers();
let searchTerm;
var searchString;
var score = 0;
var followersOne = 0;
var followersTwo = 0;

var nextArtistName;
var nextArtistPicture;
// KEY AUTHORIZATION CODE GOES HERE
myHeaders.append("Authorization", "Bearer BQCAI2XuJ1J_xgHNCFZW1MDX7gjfj0yAf7WmDSPoK2qKzv2-tNJwWwPud_IRWXJMfaQJWhzw38rfoxaETU1Lluph6nE_YkbBsEi-7Mwnx7QWNFz4qgE"); //Old Key is here place new key for it to work
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// START PAGE CODE GOES HERE
document.getElementById("start-button").addEventListener('click', function(){
  var startPage = document.querySelector("#start-page");
  var mainApp = document.querySelector("#maincontent");

  startPage.classList.add("float-up");

  setTimeout(function() {
    startPage.style.display = "none";
    mainApp.style.opacity = 1;
    mainApp.style.visibility = "visible";
    mainApp.classList.add("float-in");
    getRandomArtist("displayNameOne","displayOne");
  getRandomArtist("displayNameTwo","displayTwo");
  }, 1000);
  setTimeout(function() {
    mainApp.classList.remove("float-in");
  }, 2000);
});
// MAIN APP FUNCTIONS
  function getRandomArtist(text, textTwo) {
    // Generate a random search term (a single letter in this example)
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  
    // Construct the search query
    const searchString = `https://api.spotify.com/v1/search?q=${randomLetter}&type=artist`;
  
    // Make the API request
    fetch(searchString, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Extract a random artist from the search results
        const artists = data.artists.items;
        const randomIndex = Math.floor(Math.random() * artists.length);
        const randomArtist = artists[randomIndex];
  
        // Log the random artist information
        var element = document.getElementById(text);
        element.innerHTML = randomArtist.name;
        const imageurl = randomArtist.images[0].url;
        document.getElementById(textTwo).style.backgroundImage = `url(${imageurl})`;
        if(followersOne == 0){
          followersOne = randomArtist.followers.total;
          document.getElementById("followerdisplay").innerHTML = followersOne.toLocaleString();
        }else{
          nextArtistPicture = randomArtist.images[0].url;
          nextArtistName = randomArtist.name;
          followersTwo = randomArtist.followers.total;
        }
        // console.log(randomArtist.followers.total);
      })
      .catch(error => console.log('Error:', error));
  }
function higherOrLower(number){
  if(number == 1){
    if(followersOne < followersTwo){
      var higherButton = document.querySelector(".higher");
      higherButton.style.backgroundColor = "#1DB954";
      var bruh = followersTwo;
      setTimeout(function() {
        higherButton.style.backgroundColor = ""; // Set the button's background color back to normal
        document.getElementById("displayNameOne").innerHTML = nextArtistName;
        document.getElementById("followerdisplay").innerHTML = bruh.toLocaleString();
        document.getElementById("displayOne").style.backgroundImage = `url(${nextArtistPicture})`;
        getRandomArtist("displayNameTwo","displayTwo");
      }, 2000); // Adjust the time delay (in milliseconds) as needed
      followersOne = followersTwo;
      followersTwo = 0;
      score+=1;
      document.getElementById("score").innerHTML = score;
    }else{
      var higherButton = document.querySelector(".higher");
      higherButton.style.backgroundColor = "#FF0000";
      setTimeout(function(){
        higherButton.style.backgroundColor = "";
        endGame();
        console.log("ended game");
      }, 2000);
    }
  }else if(number == 2){
    if(followersOne > followersTwo){
      var higherButton = document.querySelector(".lower");
      higherButton.style.backgroundColor = "#1DB954";
      var bruh = followersTwo;
      setTimeout(function() {
        higherButton.style.backgroundColor = ""; // Set the button's background color back to normal
        document.getElementById("displayNameOne").innerHTML = nextArtistName;
        document.getElementById("followerdisplay").innerHTML = bruh.toLocaleString();
        document.getElementById("displayOne").style.backgroundImage = `url(${nextArtistPicture})`;
        getRandomArtist("displayNameTwo","displayTwo");
      }, 2000); // Adjust the time delay (in milliseconds) as needed
      followersOne = followersTwo;
      followersTwo = 0;
      score+=1;
      document.getElementById("score").innerHTML = score;
    }else{
      var higherButton = document.querySelector(".lower");
      higherButton.style.backgroundColor = "#FF0000";
      setTimeout(function(){
        higherButton.style.backgroundColor = "";
        endGame();
        console.log("ended game");
      }, 2000);
    }
  }
}
document.getElementById("score").innerHTML = score;
// YOU LOSE PAGE
function endGame(){
  document.querySelector("#maincontent").style.display = 'none';
  document.querySelector(".lose-page").style.display = 'flex';
  score = 0;
  document.getElementById("scoredisplay").innerHTML = score;
  followersOne = 0;
  followersTwo = 0;
}
document.getElementById("start-over").addEventListener('click', function(){
  var losePage = document.querySelector(".lose-page");
  var mainApp = document.querySelector("#maincontent");

  losePage.classList.add("float-up");
  score = 0;
  document.getElementById("scoredisplay").innerHTML = score;
  setTimeout(function() {
    losePage.style.display = 'none';
    mainApp.style.opacity = 1;
    mainApp.style.display = 'flex';
    mainApp.style.visibility = "visible";
    mainApp.classList.add("float-in");
    getRandomArtist("displayNameOne","displayOne");
    getRandomArtist("displayNameTwo","displayTwo");
  }, 1000);
  setTimeout(function() {
    losePage.classList.remove("float-up");
    mainApp.classList.remove("float-in");
  }, 2000);
});
// RUNNING FUNCTIONS