module.exports = function(app, passport, Card) {

  app.get('/', function(req, res){
    res.render('index');
  });

  app.get('/restricted', isLoggedIn, function(req,res){
    res.render('index');
  });

  app.get('/login', function(req, res){
    if (req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.render('login.ejs', {loginMessage: req.flash('loginMessage')});
    }
  });

  app.post('/login', passport.authenticate('local-login', {
        //If the login is successful then redirect to '/' (the homepage).
        successRedirect : '/',
        //Otherwise send the user back to '/login'.
        failureRedirect : '/login',
        //Enable flash messages to be sent as part of the request; this allows us to specify the login error.
        failureFlash : true
    }));

  app.get('/signup', function(req, res) {
    if (!req.isAuthenticated()) {
      //Render the signup.ejs file with
      //any signupMessages from the request.
      res.render('signup.ejs', {
        signupMessage: req.flash('signupMessage')
      });
    } else {
      //If the user is logged in then redirect then to '/'.
      res.redirect('/');
    }
  });

  app.post('/signup', passport.authenticate('local-signup', {
    //If the signup is successful then redirect the user to '/'
    successRedirect : '/',
    //Otherwise redirect them back to '/signup'
    failureRedirect : '/signup',
    //Enable flash messages to be sent as part of the request; this allows us to specify the signup error.
    failureFlash : true
  }));

  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();
      //If the request is not authenticated then redirect the user to '/login'.
      res.redirect('/login');
  }
}
