const express = require("express")
const passport = require("passport")
const app = express()
const bodyParser = require("body-parser")
const passportLocal = require("passport-local")

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(passport.initialize());

const LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
));

app.get("/",(req,res)=>{
    res.render('index.ejs')
})
app.get("/login",(req,res)=>{
    res.render('login.ejs')
})
app.post("/login",passport.authenticate('local', { failureRedirect: '/' }),(req,res)=>{
    console.log(req.body);
    res.render('login.ejs')
})

app.listen(3000)