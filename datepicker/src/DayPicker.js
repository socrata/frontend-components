import React from 'react';
import DayPicker from 'react-day-picker';
import './DayPicker.scss';

class MonthCalendar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selectedDay: null,
      disabled: !this.props.disable
    };
  }

  handleDayClick(e, day) {
    if (this.state.selectedDay && day.toLocaleDateString() === this.state.selectedDay.toLocaleDateString()) {
      day = null;
    }
    this.setState({
      selectedDay: day
    });
    this.resetParent(day);
  }

  handleSwitchChange(e) {
    this.setState({
      selectedDay: null,
      disabled: e.target.checked
    });
    this.resetParent(null);
  }

  resetParent(day) {
    if (this.props.handleChange) {
      this.props.handleChange(day);
    }
  }

  isSameDay(day1, day2) {
    day1.setHours(0, 0, 0, 0);
    day2.setHours(0, 0, 0, 0);
    return day1.getTime() === day2.getTime();
  }

  render() {
    var {selectedDay} = this.state;
    var modifiers;

    if (selectedDay) {
      modifiers = {
        'selected': (day) => this.isSameDay(selectedDay, day),
        'disabled': () => !this.state.disabled
      };
    } else {
      modifiers = {
        'disabled': () => !this.state.disabled
      };
    }

    var switcher;
    if (this.props.switcher) {
      switcher = (
        <label>
          <input
            type='checkbox'
            ref='switcher'
            checked={this.state.disabled}
            onChange={this.handleSwitchChange.bind(this)} />
          {this.props.switchLabel}
        </label>
      );
    }

    return (
        <div className="day-picker">
          {switcher}
          <DayPicker
            numberOfMonths={this.props.numberOfMonths}
            modifiers={modifiers}
            onDayClick={this.handleDayClick.bind(this)}
          />
        </div>
    );
  }
}

MonthCalendar.propTypes = {
  numberOfMonths: React.PropTypes.number,
  switcher: React.PropTypes.bool,
  switchLabel: React.PropTypes.string,
  disable: React.PropTypes.bool,
  handleChange: React.PropTypes.func
};

MonthCalendar.defaultProps = {
  numberOfMonths: 1,
  switcher: false,
  switchLabel: 'Enable/Disable',
  disable: false
};

export default MonthCalendar;
