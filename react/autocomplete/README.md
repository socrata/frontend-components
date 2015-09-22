Socrata Autocomplete Component
=======================

A typeahead component developed with React.


## Example

To build the examples locally, run:

```
npm install
```

Then open `examples/example.html` in a browser.

## React Usage

HTML:
```
<div id="app"></div>
```

JAVASCRIPT:
```
import React from 'react';
import SocrataTypeahead from './src/react.socrata.typeahead';

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
);
```

### Properties
```
placeholder: Search input placeholder
source: API source for typeahead
viewId: View id parameter for API generation
searchColumn: Search parameter for API generation
suggestionLabel: Data label from API
suggestionData: Data from API
size: Result size
```

Generated API:
```
"https://opendata-demo.test-socrata.com/views/3q2y-nhw8/columns/job_title/suggest/?size=10".
```

### References
[React Typeahead Component by Ezequiel](https://github.com/ezequiel/react-typeahead-component)
