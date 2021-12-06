//bringin in the express module fo us to use
const express = require('express')

// get an app instance using the express framework
const app = express()

//using json package to parse json
app.use(express.json());

const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */
app.get("/hello", function(req, res){
  res.send("hi"); 
})

//this is an example of a path paramater
app.get("/hello/:name", function(req, res){
  
  let input = req.params.name;
  res.send("hi " + input)
})

//this is an examples of a request body
app.post("/hi", function(req, res){
  console.log("/POST hi");
  let input = req.body;
  console.log("request body = ", input)
  res.send("hi " + input.name);
})

/* END - create routes here */


//return the entire users list on the response
app.get("/users", function(req, res){
  console.log('GET /users')
  res.json(users)
})

//returns first user
app.get("/users/1", function(req, res){
  console.log("GET /users/1")
  res.json(users[0])
})

//returns any user
// app.get("/users/:_id", function(req, res){
//   console.log("GET /user/1")
//   let id = req.params._id
//   for(let i = 0; i < users.length; i++){
//     let currentUser = users[i];
//     let currentUserId = users[i]._id;
//     if(currentUserId == id){
//       res.json(currentUser); 
//     }
//   }
//   res.status(400).json({ msg: 'No member with the id of ' + id}); 
// })

//adds new user to array of objects
app.post("/users", function(req, res){
  console.log("POST /users")
  let input = req.body;
  users.push(input);
  res.json(input);
})
//updates the first user with new values inputted to the body
app.put("/users/1", function(req, res){
  console.log("PUT /users", req.params._id)
  let input = req.body;
  let id = req.params._id;
  users[id] = input;
  res.json(input)
})

//deletes the first object in our array
app.delete("/users/:_id", function(req, res){
  console.log("DELETE /users")
  let deleted = users.splice(req.params._id, 1)
  res.json(deleted)
})


app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))