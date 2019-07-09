import React from 'react';
import { connect } from  'react-redux';

import Button from '@material-ui/core/Button';
import TicketList from '../Ticket/TicketList.js';
import TopNavBar from '../Navbars/TopNavbar/TopNavbar.js';
import { showLoader, hideLoader } from '../../actions/loader.js';
import Loader from '../Loader/Loader.js';
import {
  getSelectedSeatsByUserAsync,
  selectAdditionalServiceAsync,
  deleteAdditionalServicesAsync,
  bookSeatsAsync
} from '../../actions/seats.js'
import { checkAuthorizationAsync } from '../../actions/users.js';
// import PayForm from '../CheckoutForm/PayForm.js';


class ConfirmTickets extends React.Component {
  state = {
    sum: 0
  }
  
  getAdditionalServices = data  => {
    const {sum, checked} = data;
    checked
    ? this.setState(function(prev) {
        return {
          sum: prev.sum + sum
        }
      })
    : this.setState(function(prev) {
        return {
          sum: prev.sum - sum
        }
    })
  }

  async componentDidMount() {
    const { sessionId, cinemaId, hallId, movieId } = this.props.match.params;
    const { showLoader, checkAuthorization, deleteAdditionalServices, getSelectedSeatsByUser, hideLoader } = this.props;
    showLoader();
    await checkAuthorization();
    await deleteAdditionalServices(this.props.currentUser.id, sessionId, cinemaId, hallId, movieId);
    await getSelectedSeatsByUser(this.props.currentUser.id, sessionId, cinemaId, hallId, movieId);
    hideLoader();
  }

  render() {
    const { selectedSeatsByUser, isLoading, bookSeats, selectAdditionalService } = this.props;
    const totalCost = selectedSeatsByUser.reduce((sum, ticket) =>  
    sum + ticket.cost, 0) +  this.state.sum
    return (
      isLoading 
        ? <Loader/>
        : <div className="confirm-ticket">
            <TopNavBar/>
            {/* <PayForm totalCost={totalCost}/> */}
            <Button
               onClick={() => selectedSeatsByUser.map(seats => {
               const user = this.props.currentUser.id;
               const session = seats.session.id;
               const cinema = seats.cinema.id;
               const hall = seats.hall.id;
               const movie = seats.movie.id;
               const row = seats.row;
               const seat = seats.seat;
               const cost = seats.cost;
               const additionalServices = seats.additionalServices;
               return bookSeats(user, session, cinema, hall, movie, row, seat, cost, additionalServices)
            })}
              variant="contained" 
              color="primary"
              className="confirm-ticket__button"
            >
              Buy
            </Button>
            <div className="confirm-ticket__cost">Cost: {totalCost} $</div>
            <TicketList 
              getAdditionalServices={this.getAdditionalServices}
              selectedSeatsByUser={selectedSeatsByUser}
              user={this.props.currentUser.id}
              selectAdditionalService={selectAdditionalService}
            />
        </div>
    )
  }
}

const mapStateToProps = store => ({
  selectedSeatsByUser: store.seats.selectedSeatsByUser,
  boughtSeats: store.seats.boughtSeats,
  isLoading: store.loader.isLoading,
  currentUser: store.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  getSelectedSeatsByUser(userId, sessionId, cinemaId, hallId, movieId) {
    return dispatch(getSelectedSeatsByUserAsync(userId, sessionId, cinemaId, hallId, movieId))
  },
  showLoader() {
    dispatch(showLoader())
  },
  hideLoader() {
    dispatch(hideLoader())
  },
  checkAuthorization() {
    return dispatch(checkAuthorizationAsync())
  },
  selectAdditionalService(session, cinema, hall, movie, user, row, seat, cost, service) {
    dispatch(selectAdditionalServiceAsync(session, cinema, hall, movie, user, row, seat, cost, service))
  },
  deleteAdditionalServices(userId, sessionId, cinemaId, hallId, movieId) {
    return dispatch(deleteAdditionalServicesAsync(userId, sessionId, cinemaId, hallId, movieId))
  },
  bookSeats(user, session, cinema, hall, movie, row, seat, cost, additionalServices) {
    dispatch(bookSeatsAsync(user, session, cinema, hall, movie, row, seat, cost, additionalServices))
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(ConfirmTickets);
