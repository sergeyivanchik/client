import React from 'react';

import TimeList from './TimeList.js';


class CinemaList extends React.Component {
  render() {
    const { cinemaId, date, sessionsList, movie } = this.props;
    return(
      <div className="session-cinema">
        <div className="session-cinema__info">
          <span className="session-cinema__title">
            {sessionsList.find(session => session.cinema.id === cinemaId).cinema.name}
          </span>
        </div>
        
         <TimeList
            date={date}
            cinemaId={cinemaId}
            movie={movie}
            sessionsList={sessionsList}
            key={date + cinemaId}
          /> 
      </div>
    )
  }
}

export default CinemaList;
