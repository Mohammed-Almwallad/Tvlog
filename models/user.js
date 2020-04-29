const mongoose = require('mongoose');

let genresSchema = mongoose.Schema({
    name: String
});

let watched_moviesSchema = mongoose.Schema({

    popularity: Number,
    poster_path: String,
    id: Number,
    genres: [genresSchema],
    title: String,
    overview: String,
    release_date: Date
});

let towatch_moviesSchema = mongoose.Schema({

    popularity: Number,
    poster_path: String,
    id: Number,
    genres: [genresSchema],
    title: String,
    overview: String,
    release_date: Date
});

let watched_tvshowsSchema = mongoose.Schema({

    popularity: Number,
    poster_path: String,
    id: Number,
    genres: [genresSchema],
    name: String,
    overview: String,
    first_air_date: Date
});

let towatch_tvshowsSchema = mongoose.Schema({

    popularity: Number,
    poster_path: String,
    id: Number,
    genres: [genresSchema],
    name: String,
    overview: String,
    first_air_date: Date
});

let userSchema = mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true
    },
    watched_movies: [watched_moviesSchema],
    towatch_movies: [towatch_moviesSchema],
    watched_tvshows: [watched_tvshowsSchema],
    towatch_tvshows: [towatch_tvshowsSchema]
});


 module.exports = mongoose.model('user', userSchema);