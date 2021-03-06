export const convertDate = date => {
  let convertDate = new Date(+date);
    return `${convertDate.toLocaleString('en', {day: 'numeric'})} `+ 
      `${convertDate.toLocaleString('en', {month: 'long'})}, `.toLowerCase() +
      `${convertDate.toLocaleString('en', {weekday: 'long'})}`.toLowerCase()
};

export const getCinemasByMovieAndDate = (movieId, date, sessions) => {
  let cinemasByMovie = [];
  for(let i = 0; i < sessions.length; i++) {
    if(convertDate(sessions[i].date) === convertDate(date) && 
      sessions[i].movie.id === movieId) 
        cinemasByMovie.push(sessions[i].cinema.id); 
    }
  return cinemasByMovie.filter((item, pos) => 
    cinemasByMovie.indexOf(item) === pos);	
}

export const getDatesByMovie = (movieId, sessions) => {
  let datesByMovie = [];
  let check = 0;
  for(let i = 0; i < sessions.length; i++) {
    check = 0;
    if(sessions[i].movie.id === movieId) {
      if(datesByMovie.length === 0)
        datesByMovie.push(sessions[i].date);
      else {
        for (let j = 0; j < datesByMovie.length; j++) {
          if (convertDate(datesByMovie[j]) !== convertDate(sessions[i].date))
            check++
        }
        if (check === datesByMovie.length)
          datesByMovie.push(sessions[i].date); 
      }
    } 
  }
  return datesByMovie;
}

export const convertTime = date => {
  let currentDate = new Date(+date);
  return `${currentDate.toLocaleString('ru', {hour:'2-digit', minute:'2-digit'})}`;	
}

export const getTimesByMovieAndDateAndCinema = (movieId, date, cinemaId, sessions) => {
  let timesByMovie = [];
  for(let i = 0; i < sessions.length; i++ )
    if(convertDate(sessions[i].date) === convertDate(date) &&
      cinemaId === sessions[i].cinema.id && 
      movieId === sessions[i].movie.id
      ) 
      timesByMovie.push({
        time: sessions[i].date, 
        hallId: sessions[i].hall.id,
        hallName: sessions[i].hall.name,
        id: sessions[i].id
      });
  return timesByMovie;
}

export const sortTime = timesList => {
  let result = [];
  for ( let i = 0; i < timesList.length; i++ )
      result[i] = timesList[i];
  for(let j = 0; j < result.length-1; j++)
    for(let i = 0; i < result.length-1; i++) {
      if(convertTime(result[i].time).split('.')[0] > convertTime(result[i+1].time).split('.')[0]) {
        let change = result[i];
        result[i] = result[i+1];
        result[i+1] = change;
      } else if (convertTime(result[i].time).split('.')[0] === 
      convertTime(result[i+1].time).split('.')[0]
        ) {
        if(convertTime(result[i].time).split('.')[1] > convertTime(result[i+1].time).split('.')[1]) {
          let change = result[i];
          result[i] = result[i+1];
          result[i+1] = change;
        }
      }
    }
  return result;	
}

export const millisecondsToMinutes = milliseconds => milliseconds / (1000 * 60);

export const minutesToMilliseconds = minutes =>  minutes * 1000 * 60;
