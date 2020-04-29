const UserModel = require('../models/user');


// wathced movies
exports.addto_Watched_Movies =  async (req, res) => {
    try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=59e021a2ceb89231493f66b6f99e095c&language=en-US`);
    const data = await response.json();
    const imgurl = "https://image.tmdb.org/t/p/w400" + data.poster_path;
    let check = false;
    let check2 = false;

     
    UserModel.findOne({ email: req.user.email}).then((user) =>{
       
            user.watched_movies.forEach(e => {
                if(e.id === data.id)
                    check = true;
            });

            user.towatch_movies.forEach(e => {
                if(e.id === data.id)
                    check2 = true;
            });
            
            if(check | check2){
                req.flash('error', 'The movie is already in the watched list or the watch later list!');
                return res.redirect("/");
            }else{

        user.watched_movies.push({
            
            popularity: data.popularity,
            poster_path: imgurl,
            id: data.id,
            genres: data.genres,
            title: data.title,
            overview: data.overview,
            release_date: data.release_date
        });
         user.save();
        req.flash('success', 'The movie has been added to the watched list!');
        res.redirect('/user/Watched_Movies');
        
     }
    });

} catch(err){
    res.send(err);
}

};


exports.Watched_Movies = (req, res) => {

    let user = req.user;

    res.render('Watched_Movies', { movies: user.watched_movies, msg: req.flash('success')});
};




// towatch movies
exports.addto_towatch_movies = async (req, res) => {
    try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=59e021a2ceb89231493f66b6f99e095c&language=en-US`);
    const data = await response.json();
    const imgurl = "https://image.tmdb.org/t/p/w400" + data.poster_path;
    let check = false;
    let check2 = false;

     
    UserModel.findOne({ email: req.user.email}).then((user) =>{

        user.watched_movies.forEach(e => {
            if(e.id === data.id)
                check = true;
        });

        user.towatch_movies.forEach(e => {
            if(e.id === data.id)
                check2 = true;
        });
        
        if(check | check2){
            req.flash('error', 'The movie is already in the watched list or the watch later list!');
            return res.redirect("/");
        }else{

        user.towatch_movies.push({
            popularity: data.popularity,
            poster_path: imgurl,
            id: data.id,
            genres: data.genres,
            title: data.title,
            overview: data.overview,
            release_date: data.release_date
        });

         user.save();
         req.flash('success', 'The movie has been added to the watch later list!');
         return res.redirect('/user/Towatch_Movies');
    }


    });

} catch(err){
    res.send(err);
}

};


exports.Towatch_Movies = (req, res) => {

    let user = req.user;

    res.render('Towatch_Movies', { movies: user.towatch_movies, msg: req.flash('success')});
};


// move from towatch movies to watched movies
exports.moveMovies = async (req, res) => {

    try {
  
    UserModel.findOne({ email: req.user.email}).then((user) => {
        
        let movies =  user.towatch_movies;
        for (let i = 0; i < movies.length; i++) {
            if(movies[i].id == req.params.id){
                user.towatch_movies.id(movies[i]._id).remove();
                break;
            }
        }

        user.save();
        res.redirect(`/user/addto_Watched_Movies/`+ req.params.id);
        
    });

    } catch (error) {
        res.send(err);
    }

};


// delete from to watch

exports.remove_towatch_movie = async (req, res) => {
    try {
  
    UserModel.findOne({ email: req.user.email}).then((user) => {
        
        let movies =  user.towatch_movies;
        for (let i = 0; i < movies.length; i++) {
            if(movies[i].id == req.params.id){
                user.towatch_movies.id(movies[i]._id).remove();
                break;
            }
        }

        user.save();
        req.flash('success', 'the movie has been removed successfully!');
        res.redirect('/user/Towatch_Movies');
        
    });

    } catch (error) {
        res.send(err);
    }

};


// delete from watched

exports.remove_watched_movie = async (req, res) => {
    try {
  
    UserModel.findOne({ email: req.user.email}).then((user) => {
        
        let movies =  user.watched_movies;
        for (let i = 0; i < movies.length; i++) {
            if(movies[i].id == req.params.id){
                user.watched_movies.id(movies[i]._id).remove();
                break;
            }
        }

        user.save();
        req.flash('success', 'the movie has been removed successfully!');
        res.redirect('/user/Watched_Movies');
        
    });

    } catch (error) {
        res.send(err);
    }

};