function startProgram() {
 const fs = require("fs");
const axios = require("axios"); 
const pdf = require('pdfjs');
const randomColor = require('randomcolor')
const inquirer = require('inquirer')




let username;
let GitHubProfile;
let userRealName;
let userLocation;
let numberOfPublicRepos;
let numebrOfFollowers;
let numberOfGitHubStars;
let numberOfUsersFollowing;
let userFavColor = randomColor( {
    luminosity:'random',
    hue:'random'
});


inquirer.prompt([{

        type: "input",
        name: "favoriteColor",
        message: "What is your favorite color?"
    },
    {
        type: "input",
        name: "usernameProvided",
        message: "Enter your GitHub username",
    }
    
])
.then(function({usernameProvided, favoriteColor}){
    username = usernameProvided;
    userFavColor = favoriteColor;
    const queryUrl = `https://api.github.com/users/${username}`;
    search(queryUrl)
    console.log(usernameProvided, favoriteColor);

});

////call axios to retrieve the data////////

function search(URL) {
    axios.get(URL)
    .then(function(response){
        userRealName = response.data.name;
        userLocation = response.data.location;
        GitHubProfile = response.data.html_url;
        userBIo = response.data.bio;
        numberOfPublicRepos = response.data.public_repos;
        numberOfUsersFollowing = response.data.following;
        numebrOfFollowers = response.data.following;
        console.log(response);
        makeHTMLFile(URL);

        

    })
    .catch(function (error) {
        ///this will handle the errors///
        console.log(error);
    })
    .finally(function(){
        ////the program will always be executed////
    })

}
/// Copy HTML file into the code///

function makeHTMLFile() {
    const document = `  
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script type="text/javascript" src="lib/jquery.min.js"></script>
<script type="text/javascript" src="lib/jspdf.debug.js"></script>
<script type="text/javascript" src="lib/html2canvas.js"></script>


    <title>Developer Profile Generator</title>
</head>
<body>
    <!--------- Heading ------------------> 
    <div class="jumbotron">
        <h1 class="display-4">My Name is ${userRealName}</h1>
        <p class="lead">Currently attend UCONN Bootcamp</p>
        <hr class="my-4">
        <div id="profile-image"> </div>
        <div id="user-name"></div>
        <div class="box-container">
            <div class="row">
                <a href="${GitHubProfile}">GitHub</a>
                <a href="https://jalabre1995.github.io/Basic-Portfolio/">Portfolio</a>
                <a href=""></a>
            </div>
        </div>
        </div>
    <!----- Main content ---------------->
    <p class="bio">
    <p> I am a web developer well-versed in HTML, CSS, and javascript.</p>
    <div class="cards card-left card-top">
        <h2>
            Public-Repositories
        </h2>
        <h3>
    ${numberOfPublicRepos}
        </h3>
        <div id="public-repositories"></div>

    </div>
    <div class="cards card-left card-top">
        <h2>
            Followers
        </h2>
        <h3>
            ${numebrOfFollowers}
        </h3>
        <div id="followers">Followers</div>
    </div>
    <div class="cards card-left card-top">
        <div id="git-hub-stars">GitHub Stars</div>
        <h2>GitHub Stars

        </h2>
        <h3>
            ${numberOfGitHubStars}
        </h3>
    </div>
    <div class="cards card-left card-top">
        <div id="users-following">Users Following</div>
        <h2>
            Followers
        </h2>
        <h3>
            ${numberOfUsersFollowing}
        </h3>
    </div>
        
    </p>


    <!-------------- Footer -------------------->
    <div class="card">
        <h5 class="card-header">Featured</h5>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    
        
    
</body>

</html>
    `

fs.writeFile(`./html${username}.html`, document, function(err) {
    if (err) {
        return console/log(err);
    }
    console.log("We got it!");
    makePDFFile();
});
}
//// Make PDF file for the HTML//////
function makePDFFile() {
const html = fs.readFileSync(`./html${username}.html`, 'utf8');
const options = {
    "height": "12in",
    "width": "12in",
};

//create the pdf file/////////
pdf.create(html,options).toFile(`./pdfjs/${username}.pdfjs`, function (err, res) {
    if (err) return console.log(err);
console.log(response);
});
} 

} startProgram()




