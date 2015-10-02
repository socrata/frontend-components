import React from 'react';
import $ from 'jquery';

import Typeahead from 'react-typeahead-component';
import OptionTemplate from './react.optionTemplate';

import './autocomplete.scss';

class SocrataTypeahead extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      inputValue: this.props.inputValue || '',
      selectedSuggestion: {
        displayName: '',
        data: {}
      },
      options: []
    };

    this.handleClearSuggestion = this.handleClearSuggestion.bind(this);
  }

  componentWillMount() {
    this.renderSuggestions('');
  }

  renderSuggestions(newSuggestions){
    var suggestionUrl = this.props.source +
      this.props.viewId + '/columns/' +
      this.props.searchColumn + '/suggest/' +
      newSuggestions + '?size=' + this.props.size;

    this.getSuggestions(suggestionUrl);
  }

  getSuggestions(sourceUrl) {
    var self = this;

    $.ajax({
      method: "GET",
      url: sourceUrl
    }).success(function(result){
      self.setState({ options: result.options })
    });
  }

  setInputValue(value) {
    this.setState({ inputValue: value });
  }

  setSuggestion(value, data) {
    var obj = {
      displayName: value
    };
    obj[this.props.suggestionData] = data;
    this.setState({ selectedSuggestion: obj });
  }

  handleChange(event) {
    // event triggered when change occurs on input element
    var value = event.target.value;
    this.renderSuggestions(value);
    this.setInputValue(value);
    this.setSuggestion(value);
  }

  handleOptionChange(event, option) {
    this.setInputValue(option[this.props.suggestionLabel]);
    this.setSuggestion(option[this.props.suggestionLabel], option[this.props.suggestionData]);
  }

  handleOptionClick(event, option) {
    // event triggered after a suggestion is selected from suggestions list
    this.setInputValue(option[this.props.suggestionLabel]);
    this.setSuggestion(option[this.props.suggestionLabel], option[this.props.suggestionData]);
  }

  handleSelect(event) {
    // event triggered after the input element is selected
  }

  handleBlur(event) {
    // event triggered after the input element is blurred
  }

  handleClearSuggestion() {
    this.setInputValue('');
    this.setSuggestion('', null);
  }

  render() {
    var clearButtonClass =
      this.state.inputValue.length == 0 ?
        'clearSuggestion fa fa-times-circle hidden' : 'clearSuggestion fa fa-times-circle';

    return (
      <div className="scompAutocompleteContainer">
        <Typeahead
          placeholder = { this.props.placeholder }
          inputValue = { this.state.inputValue }
          suggestionData = { this.props.suggestionData }
          options = { this.state.options }
          optionTemplate = { OptionTemplate }
          onChange = { this.handleChange.bind(this) }
          onOptionClick = { this.handleOptionClick.bind(this) }
          onOptionChange = { this.handleOptionChange.bind(this) }
          onSelect = { this.handleSelect.bind(this) }
          onBlur = { this.handleBlur.bind(this) }
        />
        <i className={ clearButtonClass } onClick={ this.handleClearSuggestion.bind(this) }></i>
      </div>
    )
  }
}

SocrataTypeahead.propTypes = {
  placeholder: React.PropTypes.string,
  inputValue: React.PropTypes.string,
  source: React.PropTypes.string.isRequired,
  viewId: React.PropTypes.string.isRequired,
  searchColumn: React.PropTypes.string.isRequired,
  suggestionLabel: React.PropTypes.string.isRequired,
  suggestionData: React.PropTypes.string.isRequired,
  size: React.PropTypes.number.isRequired
};

SocrataTypeahead.defaultProps = {
  placeholder: 'Search...',
  inputValue: ''
};

export default SocrataTypeahead;
