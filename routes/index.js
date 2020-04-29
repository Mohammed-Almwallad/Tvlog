const express = require('express');
const router = express.Router();
global.fetch = require("node-fetch");


router.get('/', (req, res) => {

    let checkuser = false;
    if(req.isAuthenticated()){
        checkuser = true;
    }
    res.render('index', {
        checkuser: checkuser, msg: req.flash('error'), msgl: req.flash('log')
    });
});

router.get('/TopRated_Movies', (req, res) => {

    let checkuser = false;
    if(req.isAuthenticated()){
        checkuser = true;
    }

    res.render('TopRated_Movies', {
        checkuser: checkuser
    });
});

router.get('/Popular_Movies', (req, res) => {

    let checkuser = false;
    if(req.isAuthenticated()){
        checkuser = true;
    }

    res.render('Popular_Movies', {
        checkuser: checkuser
    });
});

router.get('/TopRated_Tvshow', (req, res) => {

    let checkuser = false;
    if(req.isAuthenticated()){
        checkuser = true;
    }

    res.render('TopRated_Tvshow', {
        checkuser: checkuser
    });
});

router.get('/Popular_Tvshow', (req, res) => {

    let checkuser = false;
    if(req.isAuthenticated()){
        checkuser = true;
    }

    res.render('Popular_Tvshow', {
        checkuser: checkuser
    });
});

router.get('/Tvshow_description/:id', async (req, res) => {
   
    let checkuser = false;
    if(req.isAuthenticated()){
        checkuser = true;
    }

    const response = await fetch(`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=59e021a2ceb89231493f66b6f99e095c&language=en-US`);
    const data = await response.json();
    const imgurl = "https://image.tmdb.org/t/p/w400" + data.poster_path;
    res.render('Tvshow_description', {
        data: data,
        imgurl: imgurl,
        genres: data.genres,
        checkuser: checkuser
    });
});

router.get('/Movie_description/:id', async (req, res) => {

    let checkuser = false;
    if(req.isAuthenticated()){
        checkuser = true;
    }

    const response = await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=59e021a2ceb89231493f66b6f99e095c&language=en-US`);
    const data = await response.json();
    const imgurl = "https://image.tmdb.org/t/p/w400" + data.poster_path;
    res.render('Movie_description', {
        data: data,
        imgurl: imgurl,
        genres: data.genres,
        checkuser: checkuser
    });
});





module.exports = router;