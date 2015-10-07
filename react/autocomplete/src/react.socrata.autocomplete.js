import React from 'react';
import $ from 'jquery';
import './comp-autocomplete.scss';

class SocrataAutocomplete extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: [],
      selected: [],
      searchinput: '',
      activeIndex: undefined
    };
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    this.handleDeleteFilter = this.handleDeleteFilter.bind(this);
    this.renderClearInput = this.renderClearInput.bind(this);
  }

  componentDidMount() {
    this.fetchSuggestions();
    this.refs.searchinput.getDOMNode().focus();
  }

  handleKeyboardEvents(e) {
    var activeIndex, activeItemOffset, currentScrollPosition;

    if (e.keyCode == 40) {
      e.preventDefault();
      activeIndex = this.state.activeIndex >= 0 ? Number(this.state.activeIndex) + 1 : 0; // going down

      if (typeof this.state.options[activeIndex] != 'undefined') {
        this.setState({
          activeIndex: activeIndex,
          searchinput: this.state.options[activeIndex].text
        });

        if (activeIndex < this.state.options.length) {
          activeItemOffset =
          $('.mod-socrata-autocomplete-lists-suggestions-listitem:nth-child(' + (activeIndex + 1) + ')').offset().top;

          if (activeItemOffset > (350 + $('.mod-socrata-autocomplete-lists-filter-list').height())) {
            currentScrollPosition = $('.mod-socrata-autocomplete-lists-suggestions-list').scrollTop();
            $('.mod-socrata-autocomplete-lists-suggestions-list').scrollTop(currentScrollPosition + 26);
          }
        }
      }

    } else if (e.keyCode == 38) {
      e.preventDefault();
      activeIndex = this.state.activeIndex >= 0 ? Number(this.state.activeIndex) - 1 : 0; // going up

      if (typeof this.state.options[activeIndex] != 'undefined') {
        this.setState({
          activeIndex: activeIndex,
          searchinput: this.state.options[activeIndex].text
        });

        if (activeIndex < this.state.options.length) {
          activeItemOffset =
          $('.mod-socrata-autocomplete-lists-suggestions-listitem:nth-child(' + (activeIndex + 1) + ')').offset().top;
          if (activeItemOffset < (164 + $('.mod-socrata-autocomplete-lists-filter-list').height())) {
            currentScrollPosition = $('.mod-socrata-autocomplete-lists-suggestions-list').scrollTop();
            $('.mod-socrata-autocomplete-lists-suggestions-list').scrollTop(currentScrollPosition - 26);
          }
        }
      }
    } else if (e.keyCode == 13) {
      var duplicate = false;
      var aFilters = [];

      if (this.state.activeIndex) {
        for (var i = this.state.selected.length - 1; i >= 0; i--) {
          if (this.state.selected[i].text == this.state.options[this.state.activeIndex].text) {
            duplicate = true;
          }
        };

        if (!duplicate) {
          aFilters = this.state.selected;
          aFilters.push(this.state.options[this.state.activeIndex]);

          this.setState({ selected: aFilters });
        }
      } else {
        for (var j = this.state.selected.length - 1; j >= 0; j--) {
          if (this.state.selected[j].text == this.state.options[this.state.activeIndex].text) {
            duplicate = true;
          }
        };

        if (!duplicate) {
          aFilters = this.state.selected;
          aFilters.push(this.state.options[0]);

          this.setState({ selected: aFilters });
        }
      }
    }
  }

  fetchSuggestions(newSuggestionText) {
    var newSuggestions = newSuggestionText || '';

    var suggestionUrl = this.props.source +
      this.props.viewId + '/columns/' +
      this.props.searchColumn + '/suggest/' +
      newSuggestions + '?size=' + this.props.size;

    this.setState({ requesting: true });

    var self = this;
    $.ajax({
      method: "GET",
      url: suggestionUrl
    }).success(function(result) {
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
      );
    } else if (!this.props.requestSuccess) {
      return (
        <div className="mod-socrata-autocomplete-message">
          <i className="fa fa-exclamation-triangle"></i> There was an error while loading data.
        </div>
      );
    } else {
      return '';
    }
  }

  handleSearchChange(e) {
    this.setState({ searchinput: e.target.value});
    this.fetchSuggestions(e.target.value);
  }

  handleSuggestionClick(suggestionObj, evt) {
    var duplicate = false;
    for (var i = this.state.selected.length - 1; i >= 0; i--) {
      if (this.state.selected[i].text == this.state.options[this.state.activeIndex].text) {
        duplicate = true;
      }
    };

    if (!duplicate) {
      var aFilters = this.state.selected;
      aFilters.push(suggestionObj);
      this.setState({ selected: aFilters });
    }
  }

  handleDeleteFilter(filterObj, evt) {
    // delete from filters list
    var aSelecteds = this.state.selected;
    var selectedIndex = this.getArrayItemIndexByText(filterObj, aSelecteds);
    aSelecteds.splice(selectedIndex, 1);

    // add to suggestions list
    var aOptions = this.state.options;
    aOptions.push(filterObj);

    this.setState({
      selected: aSelecteds,
      options: aOptions
    });
  }

  getArrayItemIndexByText(selectedObj, scopeArray) {
    scopeArray.indexOf(scopeArray.filter(function(item) {
        return item.text === selectedObj.text;
      })
    );
  }

  handleClearInput() {
    this.refs.searchinput.getDOMNode().value = '';
    this.setState({ searchinput: '' });
    this.fetchSuggestions();
  }

  checkActive(index) {
    if (index == this.state.activeIndex) {
      return ' is-active';
    } else {
      return '';
    }
  }

  makeItemActive(idx) {
    this.setState({ activeIndex: idx });
  }

  renderClearInput() {
    if (React.findDOMNode(this.refs.searchinput) &&
      React.findDOMNode(this.refs.searchinput).value.length > 0) {
      return <i className="clearSuggestion fa fa-times" onClick={ this.handleClearInput.bind(this) }></i>;
    }
  }

  render() {
    var self = this;

    if (this.state.selected.length > 0) {
      var selections = this.state.selected.map(function(selectionObj, idx) {
        return (
          <li className="mod-socrata-autocomplete-lists-filter-listitem"
            key={ idx }>
            <i className="fa fa-times" onClick={ self.handleDeleteFilter.bind(self, selectionObj)}></i>
            <i className="fa fa-filter"></i>
            { selectionObj.text }
          </li>
        );
      });
    }

    if (this.state.options.length > 0) {
      var suggestions = this.state.options.map(function(suggestionObj, idx) {
        if (idx + 1 === self.props.size) {
          return (
            <li className={ "mod-socrata-autocomplete-lists-suggestions-listitem" + self.checkActive(idx) }
              key={ idx }
              onClick={ self.handleSuggestionClick.bind(self, suggestionObj) }
              onMouseEnter={ self.makeItemActive.bind(self, idx) }>
              { suggestionObj.text }
            </li>
          );
        } else {
          return (
            <li className={ "mod-socrata-autocomplete-lists-suggestions-listitem" + self.checkActive(idx) }
              key={ idx }
              onClick={ self.handleSuggestionClick.bind(self, suggestionObj) }
              onMouseEnter={ self.makeItemActive.bind(self, idx) }>
              { suggestionObj.text }
            </li>
          );
        }
      });
    }
    return (
      <div className="mod-socrata-autocomplete-container">
        <div className="mod-socrata-autocomplete-triangle"></div>
        <div className="mod-socrata-autocomplete-searchfield">
          <i className="search-icon fa fa-search"></i>
          <input type="text"
            ref="searchinput"
            onChange={ this.handleSearchChange.bind(this) }
            onKeyDown={ this.handleKeyboardEvents.bind(this) } />
          { this.renderClearInput() }
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
    );
  }
}

SocrataAutocomplete.propTypes = {
  placeholder: React.PropTypes.string,
  source: React.PropTypes.string,
  viewId: React.PropTypes.string,
  searchColumn: React.PropTypes.string,
  suggestionLabel: React.PropTypes.string,
  suggestionData: React.PropTypes.string,
  size: React.PropTypes.number
};

SocrataAutocomplete.defaultProps = {
  requestSuccess: true
};

export default SocrataAutocomplete;
