import React from 'react';

class NumberRanges extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editingRefName: null
    };

    this.warnBound = this.warnBound.bind(this);
  }

  componentDidUpdate() {
    if (this.state.editingRefName) {
      React.findDOMNode(this.refs[this.state.editingRefName]).focus();
    }
  }

  toggleBoundAvailability(whichBound, e) {
    if (e.target.checked) {
      this.props.onChangeEditableToggle(whichBound, true);
      this.setState({ editingRefName: whichBound });
    } else {
      this.props.onChangeEditableToggle(whichBound, false);
      if (this.state.editingRefName == whichBound) {
        this.setState({ editingRefName: null });
      }
    }

  }

  handleChangeInput(whichBound, e) {
    this.props.onBoundChange(whichBound, e.target.value);
    this.setState({ editingRefName: whichBound });
  }

  warnBound() {
    // check if lowerbound is greater than upperbound
    if (this.props.upperBound != null && this.props.lowerBound != null &&
      parseFloat(this.props.lowerBound) >= parseFloat(this.props.upperBound)) {
      return <i className="fa fa-exclamation-triangle"></i>;
    }
    return ' ';
  }

  handleInputClick(whichBound) {
    this.props.onChangeEditableInput(whichBound);

    var refName = whichBound.toLowerCase();
    this.setState({ editingRefName: refName });
  }

  render() {
    return (
      <div className="rangeCols">
        <div className="triangle"></div>
        <div className="rangeCol rcol-1">
          <label className="checkbox-group">
            <input type="checkbox"
                    checked={ this.props.editableLower }
                    onChange={ this.toggleBoundAvailability.bind(this, 'lower') } />
             No less than
          </label>
          <input type="number" className="rangeColNumInput" pattern="[0-9]*"
                  disabled={ !this.props.editableLower }
                  ref="lower"
                  onClick={ this.handleInputClick.bind(this, 'Lower') }
                  onChange={ this.handleChangeInput.bind(this, 'lower') }
                  value={ this.props.lowerBound }/>
        </div>
        <p className="warning">
          { this.warnBound() }
        </p>
        <div className="rangeCol rcol-2">
          <label className="checkbox-group">
            <input type="checkbox"
                    checked={ this.props.editableUpper }
                    onChange={ this.toggleBoundAvailability.bind(this, 'upper') }/>
             No greater than
          </label>
          <input type="number" className="rangeColNumInput" pattern="[0-9]*"
                  disabled={ !this.props.editableUpper }
                  ref="upper"
                  onClick={ this.handleInputClick.bind(this, 'Upper') }
                  onChange={ this.handleChangeInput.bind(this, 'upper') }
                  value={ this.props.upperBound }/>
        </div>
      </div>
    );
  }

}

NumberRanges.propTypes = {
  editableLower: React.PropTypes.bool,
  lowerBound: React.PropTypes.number,
  editableUpper: React.PropTypes.bool,
  upperBound: React.PropTypes.number
};

export default NumberRanges;
