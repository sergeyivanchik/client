import React, { Component } from 'react';


class Seat extends Component {
  selectSeat = () => { 
    const row = this.props.row
    const seat = this.props.number
    const price = this.props.price
    this.props.chooseSeat({row: row, seat: seat, price: price})
  }
  
  render() {
    const { row, number, occupied, price } = this.props;
    return (
      <span 
        onClick={() => this.selectSeat()}
        occupied={occupied}
        price={price}
        className={`seat ${occupied ? `seat_occupied` : ``}`}
        title={`row ${row} seat ${number} price ${price}`}
      >
        {number}
      </span>
    )
  }
}

export default Seat;
