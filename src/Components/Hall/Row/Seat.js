import React, { Component } from 'react';
import { sendToServer } from '../../../socket';

class Seat extends Component {
  render() {
    const { session, cinema, hall, movie, row, seat, occupied, cost, bought, user, selectedOtherUser } = this.props;
    return (
      <span 
        onClick={event => { 
          if(event.target.className !== 'seat seat_bought'){
            sendToServer({user, session, cinema, hall, movie, row, seat, cost});
          }
        }}
        className={`seat ${occupied ? 'seat_occupied' : bought || selectedOtherUser ? 'seat_bought' : ''}` }
        title={`${bought || selectedOtherUser ? 'bought' : `row ${row} seat ${seat} cost ${cost}`}`}
      >
        {seat}
      </span>
    )
  }
}

export default Seat;
