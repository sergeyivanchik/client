import React from 'react';
import { connect } from 'react-redux';

import TopNavBar from '../Navbars/TopNavbar/TopNavbar.js';
import Hall from '../Hall/Hall.js';
import { getHallsByCinemaAsync } from '../../actions/halls.js';
import { getTicketsAsync } from '../../actions/tickets.js';
import { getCinemasAsync } from '../../actions/cinemas.js';
import Loader from '../Loader/Loader.js';


class Seats extends React.Component {
  async componentDidMount() {
    await this.props.onGetCinemas();
    await this.props.onGetTickets();
  }

  render() {
    return (
      !this.props.allSelectedTickets.length || !this.props.allCinemas.length ?
      <Loader/> : 
      <div className="seats">
        <TopNavBar/>
        <Hall
          movie={this.props.match.params.movie}
          cinema={this.props.match.params.cinema}
          hall={this.props.match.params.hall}
          date={this.props.match.params.date}
          time={this.props.match.params.time}
          hallSeats={this.props.allCinemas.find(cinema => 
            cinema.id === this.props.match.params.cinema).halls.find(hall => 
              hall.name === this.props.match.params.hall).places}
          seats={this.props.allSelectedTickets}
        />
      </div>
    )
  }
}

const mapStateToProps = store => ({
  allHallsByCinema: store.getHalls.allHallsByCinema,
  allSelectedTickets: store.getTickets.allSelectedTickets,
  allCinemas: store.getCinemas.allCinemas
});

const mapDispatchToProps = dispatch => ({
  onGetHallsByCinema(cinemaId) {
    return dispatch(getHallsByCinemaAsync(cinemaId))
  },
  onGetTickets() {
    return dispatch(getTicketsAsync())
  },
  onGetCinemas() {
    return dispatch(getCinemasAsync())
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Seats);
