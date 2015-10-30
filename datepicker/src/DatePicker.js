import React from 'react';
import moment from 'moment';
import DayPicker from './DayPicker.js';
import './DatePicker.scss';

class DatePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstCal: moment(this.setDate()).format('L'),
      secondCal: moment(this.setDate(2)).format('L'),
      expand: false,
      pickerType: 'between',
      filterLabel: 'All'
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

  handleCancelClick() {
    this.setState({
      expand: false
    });
  }

  handleApplyClick() {
    var label;
    var firstCal = this.state.firstCal;
    var secondCal = this.state.secondCal;
    var pickerType = this.state.pickerType;

    if (this.state.pickerType === 'between') {
      label = firstCal + ' - ' + secondCal;
    } else {
      label = pickerType + ' ' + firstCal;
    }

    this.setState({
      filterLabel: label,
      expand: false
    });
  }

  handleTypeChange(e) {
    this.setState({
      pickerType: e.target.value
    });
  }

  setDate(month) {
    var today = new Date();
    var currentMonth = today.getMonth();

    today.setMonth(currentMonth + month || currentMonth + 0);
    return today;
  }

  render() {
    var showError;
    var disableApplyButton;
    var classSet = React.addons.classSet;

    if (this.state.pickerType === 'between' && this.state.secondCal && this.state.firstCal) {
      if (this.state.firstCal <= this.state.secondCal) {
        disableApplyButton = false;
        showError = false;
      } else {
        disableApplyButton = true;
        showError = true;
      }
    } else if (this.state.pickerType !== 'between' && this.state.firstCal) {
      disableApplyButton = false;
    } else {
      disableApplyButton = true;
    }

    var classes = classSet({
      'filter-dropdown-wrapper': true,
      'expand': this.state.expand
    });

    var dropdownClasses = classSet({
      'filter-dropdown': true,
      'between': this.state.pickerType === 'between'
    });

    var errorClasses = classSet({
      'hidden': !showError
    });

    var rangeDate;
    if (this.state.pickerType === 'between') {
      rangeDate = (
        <div>
          <div className={'separator'}>
            <span>to</span>
          </div>
          <DayPicker
            initialDate={moment(this.state.secondCal, 'L').toDate()}
            numberOfMonths={1}
            handleChange={this.handleSecondCalChange.bind(this)} />
        </div>
      );
    }

    return (
      <div className={classes}>
        <div className="overlay" onClick={this.handleCancelClick.bind(this)}></div>
        <h4 onClick={this.handleExpandClick.bind(this)}>{this.state.filterLabel}</h4>
        <a className='button-expand' onClick={this.handleExpandClick.bind(this)}></a>
        <div className={dropdownClasses}>
          <div className={'filter-select'}>
            <select
              className='form-control'
              value={this.state.pickerType}
              onChange={this.handleTypeChange.bind(this)} >
              <option value="between">Between</option>
              <option value="before">Before</option>
              <option value="after">After</option>
            </select>
          </div>

          <DayPicker
            initialDate={moment(this.state.firstCal, 'L').toDate()}
            numberOfMonths={1}
            handleChange={this.handleFirstCalChange.bind(this)} />
          {rangeDate}

          <div className="filter-actions">
            <p className={errorClasses}>
              <i className="fa fa-exclamation-triangle">
              </i>
              <span>The start date cannot be later <br />
              than the end date</span>
            </p>
            <a className="btn btn-primary"
              disabled={disableApplyButton}
              onClick={this.handleApplyClick.bind(this)}>Apply</a>
            <a className="btn btn-link"
              onClick={this.handleCancelClick.bind(this)}>Cancel</a>
          </div>
        </div>
      </div>
    );
  }
}

export default DatePicker;
