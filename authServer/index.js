require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const port = process.env.PORT || 8080;
const session = require('express-session');
const passport = require('passport');
const authstrategy = require('passport-google-oauth2').Strategy;
const userDb = require('./models/userSchema');

const clientID = process.env.CID
const clientSecret = process.env.CS


//middleware
app.use(express.json());
app.use(cors({
    origin : 'http://localhost:3001',
    methods : 'GET, POST,PUT, DELETE',
    credentials : true
}));
app.use(session({
    secret:"",
    resave: false,
    saveUninitialized : true
}))
app.use(passport.initialize());
app.use(passport.session());


passport.use(
    new authstrategy({
        clientID : clientID,
        clientSecret : clientSecret,
        callbackURL : "/auth/google/callback",
        scope : ["profile", "email"]
    },
    async(accessToken,refreshToken,profile, done) =>{
        try{
            let user = await userDb.findOne({googleId : profile.id});

            if(!user){
               user = new userDb({
                googleId : profile.id,
                displayName : profile.displayName,
                email : profile.emails[0].value,
                image : profile.photos[0].value
               });

               await user.save();
            }
            return done(null, user);
        }catch(err){
            return done(err, null);
        }
    }
    )
)


passport.serializeUser((user, done)=>{
    done(null, user);
})
passport.deserializeUser((user, done)=>{
    done(null, user);
})

// initial google login
app.get("/auth/google",passport.authenticate("google",{scope : ["profile", "email"]}));
app.get("/auth/google/callback",passport.authenticate("google", {
    successRedirect : "http://localhost:3001/dashboard",
    failureRedirect : "http://localhost:3001/login"
}))

//login
app.get("/login/sucess", (req, res)=>{
    console.log(req.user)       //user data
    if(req.user){
        res.status(200).json({message : "user Login", user : req.user})
    }else{
        res.status(400).json({message : "not authorized"})
    }
})

//logout
app.get('/logout', (req, res, next)=>{
    req.logOut(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000")
    })
})

app.listen(port , ()=>{
    console.log(`your server is running on : `);
    console.log(`http://localhost:${port}`);
})
