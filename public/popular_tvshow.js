
let genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
];

let loader = 0;
let genrenum = 0;


function SelectGenre(form) {

    if (loader == 1) {
        $(document).ready(function () {

            $(".card-body").remove();

        });

    }

    Item = form.list.selectedIndex;
    Result = form.list.options[Item].text;


    if (Result === "All") {


        getAllMovies().catch(error => {

            console.log(error);
        });

    } else {

        genres.forEach(function (genreId) {

            if (genreId.name === Result) {

                genrenum = genreId.id;

            }
        });

        GetMovies(genrenum).catch(error => {
            console.log(error);
        });
    }
}

async function GetMovies(genrenum) {

    url = "https://api.themoviedb.org/3/tv/popular?api_key=59e021a2ceb89231493f66b6f99e095c&language=en-US&page=1";
    const imgurl = "https://image.tmdb.org/t/p/w400";
    let page_number = 1;



    // while (page_number < 5) {
    response = await fetch(url);
    data = await response.json();

    data.results.forEach(function (data) {

        data.genre_ids.forEach(function (ids) {


            if (ids === genrenum) {
                let img = data.poster_path;
                let title = data.name;
                let _id = data.id;

                
                let div = document.createElement("div");
                div.setAttribute("class", "card-body border border-dark rounded m-3  h-100");
                div.setAttribute("style", "width:295px;height:305px;");
                let Eimg = document.createElement("img");
                Eimg.setAttribute("id", "movie");
                Eimg.setAttribute("style", "width:205px;height:255px;");
                Eimg.setAttribute("src", imgurl + img);

                div.appendChild(Eimg);

                let div2 = document.createElement("div");
                div2.setAttribute("class", "container");
                let h4 = document.createElement("h4");
                h4.setAttribute("id", "title");
                h4.setAttribute("class", "card-title");
                h4.innerHTML = title;
                div2.appendChild(h4);

                div.appendChild(div2);


                let icon = document.createElement("div");        
                icon.innerHTML = `
                <a href="#pablo" class="profile-photo dropdown-toggle" data-toggle="dropdown"
                aria-expanded="false">
                <i class="material-icons">reorder</i>
                <div class="ripple-container"></div>
                 </a> 
                <div class="dropdown-menu">
                <a class="dropdown-item" href="http://localhost:3000/Tvshow_description/${_id}">Tv show information</a>
                <a class="dropdown-item" href="http://localhost:3000/user/addto_towatch_tvshows/${_id}">want to watch</a>
                <a class="dropdown-item" href="http://localhost:3000/user/addto_Watched_tvshows/${_id}">watched</a>
                </div>`;
                div.appendChild(icon);

                let cont = document.getElementById("carddeck");
                cont.appendChild(div);


            };

        });

    });

    //     url = url.slice(0, 104);
    //     page_number += 1;
    //     url = url.concat(page_number);
        loader = 1;

    // }
}

async function getAllMovies() {

    url = "https://api.themoviedb.org/3/tv/popular?api_key=59e021a2ceb89231493f66b6f99e095c&language=en-US&page=1";
    const imgurl = "https://image.tmdb.org/t/p/w400";
    let page_number = 1;



    // while (page_number < 5) {
        const response = await fetch(url);
        const data = await response.json();

        data.results.forEach(function (data) {
            let img = data.poster_path;
            let title = data.name;
            let _id = data.id;

            
            let div = document.createElement("div");
            div.setAttribute("class", "card-body border border-dark rounded m-3  h-100");
            div.setAttribute("style", "width:295px;height:305px;");
            let Eimg = document.createElement("img");
            Eimg.setAttribute("id", "movie");
            Eimg.setAttribute("style", "width:205px;height:255px;");
            Eimg.setAttribute("src", imgurl + img);

            div.appendChild(Eimg);

            let div2 = document.createElement("div");
            div2.setAttribute("class", "container");
            let h4 = document.createElement("h4");
            h4.setAttribute("id", "title");
            h4.setAttribute("class", "card-title");
            h4.innerHTML = title;
            div2.appendChild(h4);

            div.appendChild(div2);

            let icon = document.createElement("div");        
            icon.innerHTML = `
            <a href="#pablo" class="profile-photo dropdown-toggle" data-toggle="dropdown"
            aria-expanded="false">
            <i class="material-icons">reorder</i>
            <div class="ripple-container"></div>
             </a> 
            <div class="dropdown-menu">
            <a class="dropdown-item" href="http://localhost:3000/Tvshow_description/${_id}">Tv show information</a>
            <a class="dropdown-item" href="http://localhost:3000/user/addto_towatch_tvshows/${_id}">want to watch</a>
            <a class="dropdown-item" href="http://localhost:3000/user/addto_Watched_tvshows/${_id}">watched</a>
            </div>`;
            div.appendChild(icon);

            let cont = document.getElementById("carddeck");
            cont.appendChild(div);


           
        });

        // url = url.slice(0, 104);
        // page_number += 1;
        // url = url.concat(page_number);
        loader = 1;
    // }

}



getAllMovies();


function getgenrename(genreids) {

    let name;
    genres.forEach(function (genrename) {

        if (genreids === genrename.id) {

            name = genrename.name;

        }
    });
    return name;
}