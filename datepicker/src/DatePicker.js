import React from 'react';
import DayPicker from './DayPicker.js';
import './DatePicker.scss';

class DatePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstCal: null,
      secondCal: null,
      expand: false
    };
  }

  handleFirstCalChange(day) {
    this.setState({
      firstCal: day
    });
  }

  handleSecondCalChange(day) {
    this.setState({
      secondCal: day
    });
  }

  handleExpandClick() {
    this.setState({
      expand: !this.state.expand
    });
  }


  render() {
    var cx = React.addons.classSet;
    var classes = cx({
      'filter-dropdown-wrapper': true,
      'expand': this.state.expand
    });

    var filterLabel = 'All';

    if (this.state.firstCal && this.state.secondCal) {
      filterLabel = this.state.firstCal.toLocaleDateString() + ' - ' + this.state.secondCal.toLocaleDateString();
    } else if (this.state.firstCal) {
      filterLabel = this.state.firstCal.toLocaleDateString();
    } else if (this.state.secondCal) {
      filterLabel = this.state.secondCal.toLocaleDateString();
    }

    return (
      <div className={classes} >
        <h3 onClick={this.handleExpandClick.bind(this)}>{filterLabel}</h3>
        <a className='button-expand' onClick={this.handleExpandClick.bind(this)}></a>
        <div className='filter-dropdown'>
          <DayPicker
            numberOfMonths={1}
            switcher={true}
            switchLabel={'No earlier than'}
            handleChange={this.handleFirstCalChange.bind(this)} />
          <DayPicker
            numberOfMonths={1}
            switcher={true}
            switchLabel={'No later than'}
            disable={true} handleChange={this.handleSecondCalChange.bind(this)} />
        </div>
      </div>
    );
  }
}

export default DatePicker;
