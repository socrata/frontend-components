import React from 'react';

class OptionTemplate extends React.Component{

  render() {
    var optionStyleName = null;
    // If this option is currently selected, render it with a green background.
    if (this.props.isSelected) {
      optionStyleName = 'selectedOption';
    } else {
      optionStyleName = null;
    }

    return (
      <div className={ optionStyleName }>
        { this.props.data.text }
      </div>
    );
  }

};

export default OptionTemplate;
