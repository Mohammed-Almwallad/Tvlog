const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');


const UsersControllers = require('../controllers/users');
const MoviesControllers = require('../controllers/movies');
const TvshowsControllers = require('../controllers/tvshows');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, done) {

        UserModel.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }

            if (!user) {

                return done(null, false, { message: 'Incorrect username.' });

            }

            if (user.password != password) {

                return done(null, false, { message: 'Incorrect password.' });

            }

            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});



router.get('/', UsersControllers.show_users);


// user routes
router.get('/signup', (req, res) => {

    res.render('signup');
});

router.post('/signup', UsersControllers.sign_up);


router.get('/login', (req, res) => {

    res.render('login', { msg: req.flash('error'), msgl: req.flash('log')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/user/error' }), UsersControllers.log_in);

router.get("/error", function(req, res, next) {

    req.flash('error', 'Invalid email or password.');
    res.redirect('/user/login');
});

router.get('/logout', function (req, res) {
    req.flash('log', 'the user logged out successfully!');
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    } else {
        req.flash('error', 'you must log in first!');
        res.redirect('/user/login');
    }

}


// movies routes

// watched movies
router.get('/addto_Watched_Movies/:id', isLoggedIn, MoviesControllers.addto_Watched_Movies);

router.get('/Watched_Movies', isLoggedIn, MoviesControllers.Watched_Movies);

// to watch movies
router.get('/addto_towatch_movies/:id', isLoggedIn, MoviesControllers.addto_towatch_movies);

router.get('/Towatch_Movies', isLoggedIn, MoviesControllers.Towatch_Movies);

// from to watch to watched movies
router.get('/moveMovies/:id', isLoggedIn, MoviesControllers.moveMovies);

// remove from to watch movies
router.get('/removeTowatchMovie/:id', isLoggedIn, MoviesControllers.remove_towatch_movie);

// remove from watched movies
router.get('/removeWatchedMovie/:id', isLoggedIn, MoviesControllers.remove_watched_movie);

// tv shows routes

// watched tvshows
router.get('/addto_Watched_tvshows/:id', isLoggedIn, TvshowsControllers.addto_Watched_tvshows);

router.get('/Watched_Tvshows', isLoggedIn, TvshowsControllers.Watched_Tvshows);

// to watch tvshows
router.get('/addto_towatch_tvshows/:id', isLoggedIn, TvshowsControllers.addto_towatch_tvshows);

router.get('/Towatch_Tvshows', isLoggedIn, TvshowsControllers.Towatch_Tvshows);


// from to watch to watched tvshows
router.get('/moveTvshows/:id', isLoggedIn, TvshowsControllers.moveTvshows);

// remove from to watch tvshows
router.get('/removeTowatchTvshow/:id', isLoggedIn, TvshowsControllers.remove_towatch_tvshow);

// remove from watched tvshows
router.get('/removeWatchedTvshow/:id', isLoggedIn, TvshowsControllers.remove_watched_tvshow);



module.exports = router;
