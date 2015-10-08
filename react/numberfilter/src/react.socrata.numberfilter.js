import React from 'react';
import $ from 'jquery';

import NumberRanges from './react.socrata.numberranges';
import './numberfilter.scss';

class SocrataNumberfilter extends React.Component {

  constructor(props) {
    super(props);

    this.renderEdit = this.renderEdit.bind(this);
    this.renderRanges = this.renderRanges.bind(this);

    this.state = {
      editing: false,
      lowerBound: null,
      upperBound: null,
      editableLower: false,
      editableUpper: false
    };

    var self = this;
    $('html').click(function(e){
      if ($(e.target).parents('.rangeFilter').length == 0) {
        self.state.editing && self.setState({'editing': false});
      }
    });
  }

  toggleRangeContainer() {
    this.state.editing ? this.setState({'editing': false}) : this.setState({'editing': true});
  }

  deleteBound(deleteSide) {
    if (deleteSide == 'lower') {
      this.setState({
        'lowerBound': null,
        'editableLower': false
      });
    } else if (deleteSide == 'upper') {
      this.setState({
        'upperBound':null,
        'editableUpper': false
      });
    } else if (deleteSide == 'all') {
      this.setState({
        'lowerBound':null,
        'upperBound':null,
        'editableLower': false,
        'editableUpper': false
      });
    }
  }

  handleBoundSet(num, whichBound) {
    if (whichBound == 'upper') {
      this.setState({'upperBound': parseFloat(num)});
    } else {
      this.setState({'lowerBound': parseFloat(num)});
    }
  }

  handleEditableToggle(whichBound, bool) {
    if (whichBound == 'upper') {
      this.setState({ 'editableUpper': bool });
      if (bool == false) {
        this.setState({ upperBound: null });
      }
    } else {
      this.setState({ 'editableLower': bool });
      if (bool == false) {
        this.setState({ lowerBound: null });
      }
    }
  }

  renderRanges() {
    if (this.state.lowerBound && !this.state.upperBound) {
      return (<div className="boundsPresenter">
        { '$' + this.state.lowerBound + ' < ?' }
        <button className="btn-delete" onClick={ this.deleteBound.bind(this, 'lower') }>
          <i className="fa fa-times"></i>
        </button>
      </div>);
    } else if (!this.state.lowerBound && this.state.upperBound) {
      return (<div className="boundsPresenter">
        { '? < $' + this.state.upperBound }
        <button className="btn-delete" onClick={ this.deleteBound.bind(this, 'upper') }>
          <i className="fa fa-times"></i>
        </button>
      </div>);
    } else if (this.state.lowerBound && this.state.upperBound) {
      return (<div className="boundsPresenter">
        { '$' + this.state.lowerBound + ' < ? < $' + this.state.upperBound }
        <button className="btn-delete" onClick={ this.deleteBound.bind(this, 'all') }>
          <i className="fa fa-times"></i>
        </button>
      </div>);
    }
    return null;
  }

  handleChangeInput(whichBound, val) {
    var obj = {};
    obj[whichBound + 'Bound'] = parseFloat(val);
    this.setState(obj);
  }

  renderEdit() {
    if (this.state.editing) {
      return <NumberRanges
                onSetBound={ this.handleBoundSet.bind(this) }
                lowerBound={ this.state.lowerBound }
                editableLower={ this.state.editableLower }
                editableUpper={ this.state.editableUpper }
                upperBound={ this.state.upperBound }
                onChangeEditableToggle={ this.handleEditableToggle.bind(this) }
                onBoundChange={ this.handleChangeInput.bind(this) } />;
    }
    return null;
  }

  render() {
    return (
      <div className="rangeFilter">
        <h3>{ this.props.name }</h3>
        <div className="inputContainer">
          <div className="inputPresenter" onClick={ this.toggleRangeContainer.bind(this) }>
            { this.renderRanges() }
            <i className="btn-toggle fa fa-chevron-down"
                onClick={ this.toggleRangeContainer.bind(this) }></i>
          </div>
          { this.renderEdit() }
        </div>
      </div>
    );
  }

};

export default SocrataNumberfilter;
