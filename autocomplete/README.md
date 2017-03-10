Socrata Autocomplete Component
=======================

A typeahead component developed with React.


## Example

To build the examples locally, run:

```
npm install
```

Then open `examples/example.html` in a browser.

## Usage

__React Usage__

```
var SocrataTypeahead = require('react.socrata.typeahead');

<SocrataTypeahead
    placeholder={placeholder}
    source={.source}
    viewId={viewId}
    searchColumn={searchColumn}
    suggestionLabel={suggestionLabel}
    suggestionData={suggestionData}
    size={size}/>
```

__Without React Usage__

HTML:
```
<div id="app"></div>
```
JavaScript:
```
var config = {
    parentId: 'app', 
    placeholder: 'Search',
    source: 'https://opendata-demo.test-socrata.com/views/',
    viewId: '3q2y-nhw8',
    searchColumn: 'job_title',
    suggestionLabel: 'text',
    suggestionData: 'score',
    size: 10
};
SocrataAutocomplete(config)
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
