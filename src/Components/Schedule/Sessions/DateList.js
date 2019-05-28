import React from 'react';

import CinemaList from './CinemaList.js';
import { getCinemasByMovieAndDate, convertDate } from '../../../functions/index.js'


class DateList extends React.Component {
  render() {
    const { date, movie, sessionsList, cinemasList } = this.props;
    return (
      <div className="session-date">
        <div className="session-date__date">
          {convertDate(date)}
        </div> 
          {getCinemasByMovieAndDate(movie, date, sessionsList).map(cinema =>
            <CinemaList
              cinemaId={cinema}
              movie={movie}
              date={date}
              sessionsList={sessionsList}
              cinemasList={cinemasList}
              deleteTickets={this.props.deleteTickets}
              key={`${movie}${date}${cinema}`}
            />
          )}
      </div>
    )
  }
}

export default DateList;
