import React from 'react';

import SocrataAutocomplete from './src/react.socrata.autocomplete';

var config = {
  parentId: 'app',
  placeholder: 'Search',
  source: 'https://opendata-demo.test-socrata.com/views/',
  viewId: '3q2y-nhw8',
  searchColumn: 'job_title',
  suggestionLabel: 'text',
  suggestionData: 'score',
  size: 70
}

React.render(
  <div>
    <SocrataAutocomplete
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

/*import SocrataTypeahead from './src/react.socrata.typeahead';

var config = {
  parentId: 'app',
  placeholder: 'Search',
  source: 'https://opendata-demo.test-socrata.com/views/',
  viewId: '3q2y-nhw8',
  searchColumn: 'job_title',
  suggestionLabel: 'text',
  suggestionData: 'score',
  size: 10
}

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
);*/