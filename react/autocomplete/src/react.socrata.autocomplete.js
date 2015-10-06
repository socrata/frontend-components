import React from 'react';
import $ from 'jquery';
import './comp-autocomplete.scss';

class SocrataAutocomplete extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      options: [],
      selected: [],
      searchinput: '',
      activeIndex: undefined
    };
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    this.handleDeleteFilter = this.handleDeleteFilter.bind(this);
  }

  componentDidMount() {
    this.renderSuggestions();
    this.refs.searchinput.getDOMNode().focus();
  }

  handleKeyboardEvents(e) {
    var idx;

    if(e.keyCode == 40) {
      e.preventDefault();
      idx = (this.state.activeIndex >= 0) ? parseFloat(this.state.activeIndex) + 1 : 0; // going down

      if(typeof this.state.options[idx] != 'undefined'){
        this.setState({
          activeIndex: idx,
          searchinput: this.state.options[idx].text
        });

        if(idx < this.state.options.length){
          var activeItemOffset =
          $('.mod-socrata-autocomplete-lists-suggestions-listitem:nth-child(' + (idx + 1) + ')').offset().top;

          if(activeItemOffset > (300 + $('.mod-socrata-autocomplete-lists-filter-list').height())) {
            var currentScrollPosition = $('.mod-socrata-autocomplete-lists-suggestions-list').scrollTop();
            $('.mod-socrata-autocomplete-lists-suggestions-list').scrollTop(currentScrollPosition + 26);
          }
        }
      }

    } else if(e.keyCode == 38) {
      e.preventDefault();
      idx = (this.state.activeIndex >= 0) ? parseFloat(this.state.activeIndex) - 1 : 0; // going up

      if(typeof this.state.options[idx] != 'undefined'){
        this.setState({
          activeIndex: idx,
          searchinput: this.state.options[idx].text
        });

        if(idx < this.state.options.length){
          var activeItemOffset =
          $('.mod-socrata-autocomplete-lists-suggestions-listitem:nth-child(' + (idx + 1) + ')').offset().top;
          if(activeItemOffset < (138 + $('.mod-socrata-autocomplete-lists-filter-list').height())) {
            var currentScrollPosition = $('.mod-socrata-autocomplete-lists-suggestions-list').scrollTop();
            $('.mod-socrata-autocomplete-lists-suggestions-list').scrollTop(currentScrollPosition - 26);
          }
        }
      }
    } else if(e.keyCode == 13) {
      if(this.state.activeIndex) {
        var aFilters = this.state.selected;
        aFilters.push(this.state.options[this.state.activeIndex]);

        var aOptions = this.state.options;
        aOptions.splice(this.state.activeIndex, 1);

        this.setState({
          options: aOptions,
          selected: aFilters
        });
      }
    }
  }

  renderSuggestions(newSuggestions){
    var newSuggestions = newSuggestions || '';

    var suggestionUrl = this.props.source +
      this.props.viewId + '/columns/' +
      this.props.searchColumn + '/suggest/' +
      newSuggestions + '?size=' + this.props.size;

    this.getSuggestions(suggestionUrl);
  }

  getSuggestions(sourceUrl) {
    var self = this;

    this.setState({ requesting: true });
    $.ajax({
      method: "GET",
      url: sourceUrl
    }).success(function(result){
      self.setState({
        requesting: false,
        options: result.options,
        activeIndex: undefined
      });
      self.props.requestSuccess = true;
    }).error(function(err) {
      self.props.requestSuccess = false;
      self.setState({
        requesting: true,
        options: [],
        activeIndex: undefined
      });
    });
  }

  message() {
    if (this.state.requesting && this.props.requestSuccess) {
      return (
        <div className="mod-socrata-autocomplete-message">
          <i className="fa fa-spinner fa-pulse"></i> Loading data...
        </div>
      )
    } else if (!this.props.requestSuccess) {
      return (
        <div className="mod-socrata-autocomplete-message">
          <i className="fa fa-exclamation-triangle"></i> There was an error while loading data.
        </div>
      )
    } else {
      return '';
    }
  }

  handleSearchChange(e) {
    this.setState({ searchinput: e.target.value});
    this.renderSuggestions(e.target.value);
  }

  handleSuggestionClick(suggestionObj, evt) {
    var aSelecteds = this.state.selected;
    aSelecteds.push(suggestionObj);

    var aOptions = this.state.options;
    var selectedIndex = this.getArrayItemIndexByText(suggestionObj, aOptions);
    aOptions.splice(selectedIndex,1);

    this.setState({
      options: aOptions,
      selected: aSelecteds
    });
  }

  handleDeleteFilter(filterObj, evt) {
    // delete from filters list
    var aSelecteds = this.state.selected;
    var selectedIndex = this.getArrayItemIndexByText(filterObj, aSelecteds);
    aSelecteds.splice(selectedIndex,1);

    // add to suggestions list
    var aOptions = this.state.options;
    aOptions.push(filterObj);

    this.setState({
      selected: aSelecteds,
      options: aOptions
    });
  }

  getArrayItemIndexByText(selectedObj, scopeArray) {
    for (var i = scopeArray.length - 1; i >= 0; i--) {
      if(scopeArray[i].text == selectedObj.text) {
        return i;
      }
    };
  }

  handleClearInput() {
    this.setState({ searchinput: '' });
    this.renderSuggestions();
  }

  checkActive(index) {
    if(index == this.state.activeIndex) {
      return ' is-active';
    } else {
      return '';
    }
  }

  render() {
    var self = this;

    if (this.state.selected.length > 0) {
      var selections = this.state.selected.map(function(selectionObj, idx){
        return (
          <li className="mod-socrata-autocomplete-lists-filter-listitem"
            key={idx}>
            <i className="fa fa-filter"></i>
            { selectionObj.text }
            <i className="fa fa-times" onClick={ self.handleDeleteFilter.bind(self, selectionObj)}></i>
          </li>
        )
      });
    }

    if (this.state.options.length > 0) {
      var suggestions = this.state.options.map(function(suggestionObj, idx){
        if(idx + 1 === self.props.size) {
          return (
            <li className={ "mod-socrata-autocomplete-lists-suggestions-listitem" + self.checkActive(idx) }
              data-obj={ suggestionObj }
              key={ idx }
              onClick={ self.handleSuggestionClick.bind(self, suggestionObj) }>
              { suggestionObj.text }
            </li>
          )
        } else {
          return (
            <li className={ "mod-socrata-autocomplete-lists-suggestions-listitem" + self.checkActive(idx) }
              data-obj={ suggestionObj }
              key={ idx }
              onClick={ self.handleSuggestionClick.bind(self, suggestionObj) }>
              { suggestionObj.text }
            </li>
          )
        }
      });
    }

    return (
      <div className="mod-socrata-autocomplete-container">
        <div className="mod-socrata-autocomplete-triangle"></div>
        <div className="mod-socrata-autocomplete-searchfield">
          <i className="search-icon fa fa-search"></i>
          <input type="text" ref="searchinput"
            value={ this.state.searchinput }
            onChange={ this.handleSearchChange.bind(this) }
            onKeyDown={ this.handleKeyboardEvents.bind(this) }/>
          { this.state.searchinput && <i className="clearSuggestion fa fa-times" onClick={ this.handleClearInput.bind(this) }></i>}
        </div>
        { this.message() }
        <div className="mod-socrata-autocomplete-lists">
          { selections && <h4>Applied Filters</h4> }
          <ul className="mod-socrata-autocomplete-lists-filter-list">
            { selections }
          </ul>
          <ul className="mod-socrata-autocomplete-lists-suggestions-list">
            { suggestions }
            <li className="listitem-footnote">
              Above is the first { self.props.size } results from dataset. Refine your search more for
              granular results.</li>
          </ul>

        </div>
      </div>
    )
  }
}


SocrataAutocomplete.defaultProps = {
  requestSuccess: true
};

export default SocrataAutocomplete;
