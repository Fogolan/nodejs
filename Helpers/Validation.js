exports.validateFilm = function validateFilm(film) {
    for (key in film) {
        if (film[key] === undefined)
            return false;
    }
    if (film.year < 1900 || film.year > 2017)
        return false;
    if (film.budget < 0 || film.gross < 0 || film.rating < 0 || film.position <= 0)
        return false;
    if (film.title == '')
    return false;
    if(film.rating > 10 || film.rating <=0)
        return false;
    return true;
}

exports.checkPosition = function checkPosition(films,film) {
    films.forEach(element => {
        if (element.position >= film.position)
            element.position++;
    })
    return film;
}


exports.deleteSpaces = function deleteSpaces(films,film){
    let filmsLength = films.length;
    if(film.position > filmsLength)
    film.position = filmsLength +1;
    return film;
}

exports.validateDeleteFilm = function validateDeleteFilm(films,film){
    films.forEach(element => {
        if (element.position >= film.position)
            element.position--;
    })
    return film;
}


exports.validateUpdateFilm = function validateUpdateFilm(newFilm,oldFilm,films){
        newFilm = {
            id: oldFilm.id,
            title: newFilm.title,
            rating: newFilm.rating,
            year: +newFilm.year,
            budget: +newFilm.budget,
            gross: +newFilm.gross,
            poster: newFilm.poster,
            position: +newFilm.position
        };

        for (key in newFilm) {
            if (newFilm[key] === undefined)
            newFilm[key] = oldFilm[key];
        }
        return newFilm;
}