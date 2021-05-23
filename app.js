const express = require("express");
let ejs = require("ejs");
const { static } = require("express");

const app = express();

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod elementum nisi quis eleifend quam. Urna molestie at elementum eu facilisis sed odio. Quisque egestas diam in arcu cursus euismod. Ut venenatis tellus in metus vulputate. Morbi tempus iaculis urna id volutpat lacus laoreet non. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Quam elementum pulvinar etiam non. In cursus turpis massa tincidunt dui ut ornare. Et tortor at risus viverra adipiscing. Et malesuada fames ac turpis."

app.set('view engine', 'ejs');

//app.use(express.static("public"))

app.get("/", function(req, res) {
    res.render('home', {homeContent: homeStartingContent});
});

app.listen(3000, function(req, res) {
    console.log("Server started on PORT 3000");
});