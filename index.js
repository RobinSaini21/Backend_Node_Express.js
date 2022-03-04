require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const crypto = require("crypto");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const console = require("console");
const res = require("express/lib/response");
const Port = 4000;

const UserSchema = mongoose.Schema({
 email:String,
  password: String,
  token: String
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.urlencoded({ extended: true }));
const user = {
  id: 1,
  username: "Robin",
  post: "post no 1",
};

const config = process.env

mongoose.connect(config.CONNECT_DB,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});()=>{
  console.log("connected to DB")
}

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/Index.html');
  });

  const User = mongoose.model("TestUsers", UserSchema )

  app.post("/register", async (req,res) =>{
    console.log(req.body)
    const {Email ,password} = req.body
    // res.send(`Username: ${username} Password: ${password}`); 
const email = Email
    const userpassword = await bcrypt.hash(password,10);
    console.log(userpassword);
    const nuser = true
    if(email){
      const payload = {
        user: {
          email: email
        }
      }
      console.log(payload);
      jwt.sign(
        payload,
        config.SECRET_KEY,
        {
          expiresIn: "2h"
        },
        (err,token) =>{
        
            console.log(token)
            
            
            if(!token){
              throw err
            }
            else{
              jwt.verify(token,config.SECRET_KEY,(err,user) =>{
                if(err) throw err
                else{
                 
                  console.log(user)
               
                }
              })
            }
       
           const user = User.create({
             email,
             password: userpassword,
             token: config.SECRET_KEY
           }) 
           console.log(user)
        }
   
      )
       res.status(200).send(`User Info ${user}`)
    }

  })
  app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/Login.html');
  });


// app.post('/login', async (res,req) =>{
//  const {email,password} = req.body
//   let user = User.findOne({
//    email
//   })
//   if(user){
//     res.send(true)
//   }
//   else{
//     res.send(false)
//   }
// })



app.post("/login", async (req,res) =>{
  console.log(req.body)
  const {Email ,password} = req.body
  // res.send(`Username: ${username} Password: ${password}`); 
const email = Email
  console.log(email)

})


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(Port, () => {
  console.log(`Listening on Port ${Port}`);
});
