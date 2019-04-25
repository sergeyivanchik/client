import React from 'react';

import TimeList from './TimeList.js';


class CinemaList extends React.Component {
  render() {
    const { cinema, date, sessionsList, movie, cinemasList } = this.props
    return(
      <div className="session-info">
        <div className="cinema-info">
          <span className="cinema">
            {cinemasList.find(cinemaById => cinemaById.id === cinema).name}
          </span>
        </div>
         <TimeList
            date={date}
            cinema={cinema}
            movie={movie}
            sessionsList={sessionsList}
            key={`${date}${cinema}`}
          /> 
      </div>
    )
  }
}

export default CinemaList;
