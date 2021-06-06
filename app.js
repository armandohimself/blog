const express = require("express");
let ejs = require("ejs");
const { static } = require("express");
const _ = require('lodash');

const app = express();

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod elementum nisi quis eleifend quam. Urna molestie at elementum eu facilisis sed odio. Quisque egestas diam in arcu cursus euismod. Ut venenatis tellus in metus vulputate. Morbi tempus iaculis urna id volutpat lacus laoreet non. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Quam elementum pulvinar etiam non. In cursus turpis massa tincidunt dui ut ornare. Et tortor at risus viverra adipiscing. Et malesuada fames ac turpis.";
const aboutContent = "Rhoncus urna neque viverra justo nec ultrices dui. A pellentesque sit amet porttitor eget dolor morbi non arcu. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. At varius vel pharetra vel turpis. Velit egestas dui id ornare. Nisl purus in mollis nunc sed. Viverra justo nec ultrices dui. Sit amet volutpat consequat mauris nunc congue. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Viverra mauris in aliquam sem fringilla ut. Enim sed faucibus turpis in eu mi bibendum. Mattis pellentesque id nibh tortor id. Amet volutpat consequat mauris nunc congue nisi vitae. Amet luctus venenatis lectus magna fringilla.";
const contactContent = "Eget aliquet nibh praesent tristique magna sit. Quam vulputate dignissim suspendisse in est ante in. Scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt. Vitae auctor eu augue ut lectus arcu bibendum at. Imperdiet nulla malesuada pellentesque elit eget gravida. Pellentesque elit eget gravida cum sociis natoque penatibus et. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Pellentesque elit eget gravida cum sociis natoque. Sem integer vitae justo eget magna fermentum. Mattis aliquam faucibus purus in massa. Amet volutpat consequat mauris nunc. At tellus at urna condimentum mattis pellentesque id. Ipsum suspendisse ultrices gravida dictum fusce ut. Tincidunt id aliquet risus feugiat.";

let  postsArr = [];

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.render('home', {homeContent: homeStartingContent, postsArr: postsArr});
});

app.post("/", function(req, res) {
    res.redirect('/');
})

app.get("/about", function(req, res) {
    res.render('about', {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
    res.render('contact', {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
    res.render('compose', {postsArr: postsArr});
    console.log(req.params.var);
});

app.post("/compose", function(req, res) {
    //console.log(req.body);
    const postObj = {
        title: req.body.title, 
        post: req.body.post
    }
    postsArr.push(postObj);
    //console.log(postsArr);
    res.redirect("/");
});

app.get("/posts/:data", function(req, res) {
    const URLparam = _.lowerCase(req.params.data);
    console.log("You in posts/:data fam: ", URLparam);
    
    postsArr.forEach(function(post) {
      const postTitle = _.lowerCase(post.title);

        if (postTitle === URLparam) {
            console.log("Match was found");
            res.render("post", {postTitle: post.title, postBody: post.post});
        }
        else {
            console.warn("Not a match");
            res.redirect("/");
        }
    });
});

app.listen(3000, function(req, res) {
    console.log("Server started on PORT 3000");
});