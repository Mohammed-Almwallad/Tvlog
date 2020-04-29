const UserModel = require('../models/user');




exports.addto_Watched_tvshows = async (req, res) => {
    try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=59e021a2ceb89231493f66b6f99e095c&language=en-US`);
    const data = await response.json();
    const imgurl = "https://image.tmdb.org/t/p/w400" + data.poster_path;
    let check = false;
    let check2 = false;
     
    UserModel.findOne({ email: req.user.email}).then((user) =>{

        user.watched_tvshows.forEach(e => {
            if(e.id === data.id)
                check = true;
        });

        user.towatch_tvshows.forEach(e => {
            if(e.id === data.id)
                check2 = true;
        });

        
        if(check | check2){
         req.flash('error', 'The tv show is already in the watched list or the watch later list!');
           return res.redirect("/");
        }else{

        user.watched_tvshows.push({
            popularity: data.popularity,
            poster_path: imgurl,
            id: data.id,
            genres: data.genres,
            name: data.name,
            overview: data.overview,
            first_air_date: data.first_air_date
        });
         user.save();
         req.flash('success', 'The tv show has been added to the watched list!');
         res.redirect('/user/Watched_Tvshows');
        }
    });

} catch(err){
    res.send(err);
}

};


exports.Watched_Tvshows = (req, res) => {

    let user = req.user;

    res.render('Watched_Tvshows', { tvshows: user.watched_tvshows, msg: req.flash('success')});
};


exports.addto_towatch_tvshows = async (req, res) => {
    try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${req.params.id}?api_key=59e021a2ceb89231493f66b6f99e095c&language=en-US`);
    const data = await response.json();
    const imgurl = "https://image.tmdb.org/t/p/w400" + data.poster_path;
    let check = false;
    let check2 = false;
     
    UserModel.findOne({ email: req.user.email}).then((user) =>{
        

        user.watched_tvshows.forEach(e => {
            if(e.id === data.id)
                check = true;
        });

        user.towatch_tvshows.forEach(e => {
            if(e.id === data.id)
                check2 = true;
        });

        
        if(check | check2){
         req.flash('error', 'The tv show is already in the watched list or the watch later list!');
            return res.redirect("/");
        }else{

        user.towatch_tvshows.push({
            popularity: data.popularity,
            poster_path: imgurl,
            id: data.id,
            genres: data.genres,
            name: data.name,
            overview: data.overview,
            first_air_date: data.first_air_date
        });
         user.save();
         req.flash('success', 'The tv show has been added to the watch later list!');
         res.redirect('/user/Towatch_Tvshows');

    }
    });

} catch(err){
    res.send(err);
}

};


exports.Towatch_Tvshows = (req, res) => {

    let user = req.user;

    res.render('Towatch_Tvshows', { tvshows: user.towatch_tvshows, msg: req.flash('success')});
};



// move from towatch tvshows to watched tvshows
exports.moveTvshows = async (req, res) => {

    try {
  
    UserModel.findOne({ email: req.user.email}).then((user) => {
        
        let tvshows =  user.towatch_tvshows;
        for (let i = 0; i < tvshows.length; i++) {
            if(tvshows[i].id == req.params.id){
                user.towatch_tvshows.id(tvshows[i]._id).remove();
                break;
            }
        }

        user.save();
        res.redirect(`/user/addto_Watched_tvshows/`+ req.params.id);
        
    });

    } catch (error) {
        res.send(err);
    }

};


// delete from to watch

exports.remove_towatch_tvshow = async (req, res) => {
    try {
  
    UserModel.findOne({ email: req.user.email}).then((user) => {
        
        let tvshows =  user.towatch_tvshows;
        for (let i = 0; i < tvshows.length; i++) {
            if(tvshows[i].id == req.params.id){
                user.towatch_tvshows.id(tvshows[i]._id).remove();
                break;
            }
        }

        user.save();
        req.flash('success', 'the tv show has been removed successfully!');
        res.redirect('/user/Towatch_Tvshows');
        
    });

    } catch (error) {
        res.send(err);
    }

};



// delete from watched

exports.remove_watched_tvshow = async (req, res) => {
    try {
  
    UserModel.findOne({ email: req.user.email}).then((user) => {
        
        let tvshows =  user.watched_tvshows;
        for (let i = 0; i < tvshows.length; i++) {
            if(tvshows[i].id == req.params.id){
                user.watched_tvshows.id(tvshows[i]._id).remove();
                break;
            }
        }

        user.save();
        req.flash('success', 'the tv show has been removed successfully!');
        res.redirect('/user/Watched_Tvshows');
        
    });

    } catch (error) {
        res.send(err);
    }

};