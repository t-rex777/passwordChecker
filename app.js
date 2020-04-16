const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

let A,N,T,D,X;
    
//  T=possibilities   //    A=Length   //    N=No. of characters //  D=No. of hours
// X=No. of years that will have to pass before the space
// can be checked in less than one hour

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin_manish:manish1408@cluster0-r7gze.mongodb.net/passwordDB", {useNewUrlParser:true , useUnifiedTopology: true });

const passwordSchema = {
    password : String
}

const Password = mongoose.model("Password", passwordSchema);


app.get("/",(req,res)=>{
    res.render("home",{years : X , hours : D});
});

app.post("/",(req,res)=>{
    const userPass = req.body.pass;
    console.log(userPass)
    
    N = userPass.length;
    A = 26;
    T = Math.pow(A,N);
    D = T/(Math.pow(10,9)*3600);
    X = 2*Math.log(T/(Math.pow(10,9)*3600));
    if(X<0){
        X= 0;
    }
    
    console.log(A);
    console.log(N);
    console.log(T);
    console.log((D).toFixed(12));
    console.log(X);
    
const password = new Password({
    password : userPass
});
password.save();
res.redirect("/");
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}
app.listen(port, function() {
  console.log("Server has started sucessfully");
});