const express = require("express");
let ejs = require("ejs");
const { static } = require("express");
const _ = require('lodash');
const mongoose = require("mongoose");

//connection to local db
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//db schema for a fruit
const fruitSchema = new mongoose.Schema({
    name: {
        type: String, 
        //required: [true, "A fruit needs a name"],
    }, 
    rating: Number, 
    review: String
});

//db model
const Fruit = mongoose.model("Fruit", fruitSchema);
/* We define the model name (Fruit) and tell mongoose we want to create a model called 
"Fruit". We then also pass the schema so it knows what the "scafolding will be"
**/

//create a new model object called fruit and add in it's property's info
const fruit = new Fruit({
    name: "Peaches",
    rating: 10, 
    review: "Adding a peach"
});

const pineapple = new Fruit({
    name: "Pineapple", 
    score: 10, 
    review: "Also Armando's favorite!"
});

//save info to db
pineapple.save();

//db schema for a person
const personSchema = new mongoose.Schema({
    name: String, 
    age: Number, 
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Armando Arteaga",
    age: 23
});

person.save();


//Retrieve data from DB
// Fruit.find(function(err, fruits) {
//     if(err) {
//         console.log("OMG Error");
//     } else {

//         //close connection to db once you're done for good practice
//         mongoose.connection.close(function(err) {
//             if(err) {
//                 console.log("Something went wrong trying to close the connection to DB");
//             } else {
//                 console.log("Closed the connection the the DB successful!");
//             }
//         });

//         fruits.forEach(fruit => console.log(fruit.name));
//         console.log(fruits);
//     }
// });
/** You can tap into the find method from our Fruit model we created. Think of this like
 * your collection. Then you give the find method a callback and pass over an err for errors
 * and an arbitrary name for the thing you are trying to return. In our case, it's a bunch of
 * fruits so let's call it fruits.
 */

//updating one record in the mongo DB
// Fruit.updateOne({_id: "60c7b249b19ae02a238117d8"}, {name: "Banana"}, function(err) {
//     if (err) {
//         console.log("There was an error updating Fruit");
//     } else {
//         console.log("Updated Fruit successfully!");
//     }
// });
/** First parameter is the query/record you're targeting, then it's the property, finally the callback */

Person.updateOne({name: "Armando Arteaga"}, {favoriteFruit: pineapple}, function(err) {
    if (err) {
        console.log("There was an error updating Fruit");
    } else {
        console.log("Updated Armando's favorite Fruit successfully!");
    }
});

//delete one from DB
// Fruit.deleteOne({_id: "60ceb63554cdda52dc8d6bc9"}, function(err) {
//     if (err) {
//         console.log("There was an error deleting Fruit");
//     } else {
//         console.log("Deletion of Fruit successfully!");
//         //close connection to db once you're done for good practice
//         mongoose.connection.close(function(err) {
//             if(err) {
//                 console.log("Something went wrong trying to close the connection to DB");
//             } else {
//                 console.log("Closed the connection the the DB successful!");
//             }
//         });
//     }
// });

Fruit.deleteMany({name: "Pineapple"}, function(err) {
    if (err) {
        console.log("There was an error deleting many people");
    } else {
        console.log("Sucessfully deleted many people");
    }
}); 

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