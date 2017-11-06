//Set the login strategy as passport allows for facebook, twitter and google logins as well as local.
var LocalStrategy = require('passport-local').Strategy;
//Get the user database model.
var User = require('../models/user');

module.exports = function(passport) {

    // =========================================================================
    // Session setup ===========================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // SIGNUP ==================================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy({
        //Set up the login details to be used.
        usernameField : 'username',
        passwordField : 'password',
        //Allows us to pass back the entire request to the callback.
        passReqToCallback : true
    },
    function(req, username, password, done) {

        // Asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        //Find a user whose username is the same as the forms username to check if that username is already in use.
        User.findOne({ 'local.username' :  username }, function(err, user) {
            //If there are any errors, return the error.
            if (err)
                return done(err);

            //Check to see if theres already a user with that username, if there is then send a flash message saying so.
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {

                //If there is no user with that username, then create the user.
                var newUser = new User();

                //Set the user's credentials.
                newUser.local.username = username;
                //Hash the password input by the user, using bcrypt.
                newUser.local.password = newUser.generateHash(password);

                //Save the created user to the database.
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

        });

    }));

    // =========================================================================
    // LOGIN ===================================================================
    // =========================================================================


    passport.use('local-login', new LocalStrategy({
      //Set up the login details to be used.
      usernameField : 'username',
      passwordField : 'password',
      //Allows us to pass back the entire request to the callback.
      passReqToCallback : true
     },
     function(req, username, password, done) { // callback with username and password from our form

         //Check if a user whose username is the same as the forms username exists, as we are checking if the user actually exists before we attempt to log in.
         User.findOne({ 'local.username' :  username }, function(err, user) {
             //If there are any errors, return the error before anything else.
             if (err)
                 return done(err);

             //If no user is found or the password is incorrect return the error message.
             if (!user || !user.validPassword(password))
                 return done(null, false, req.flash('loginMessage', 'Incorrect username or password.'));

             //If all is well, return successful user.
             return done(null, user);
         });

     }));

    //A function to check if the request if authenticated.
    function isLoggedIn(req, res, next) {

    //If user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    //If they aren't them redirect them to the login page.
    res.redirect('/login');
    }


};
