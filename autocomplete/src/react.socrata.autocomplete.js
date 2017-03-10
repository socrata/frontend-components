import React from 'react'
import SocrataTypeahead from './react.socrata.typeahead';

var SocrataAutocomplete = function(config){
  React.render(
    <div>
      <SocrataTypeahead
        placeholder={config.placeholder}
        source={config.source}
        viewId={config.viewId}
        searchColumn={config.searchColumn}
        suggestionLabel={config.suggestionLabel}
        suggestionData={config.suggestionData}
        size={config.size}/>
    </div>,
    document.getElementById(config.parentId)
  );
}

window.SocrataAutocomplete = SocrataAutocomplete;
