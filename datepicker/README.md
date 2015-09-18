Socrata Day & Date Picker Component
=======================

A date picker component developed with React.

## Example

To build the examples locally, run:

```
npm install
npm start
```

Then open `http://localhost:3000/` in a browser.

## Usage

```
import DayPicker from './DayPicker.js';

<DayPicker
  numberOfMonths={1}
  switcher={true}
  switchLabel={‘Pick a day’}
  handleChange={this.handleChange.bind(this)} />
```

### Properties
```
numberOfMonths={number} // The number of months. Default is 1
switcher={boolean} // Enable checkbox for disable calendar. Default is false
switchLabel={string} // Label for checkbox. Default is ‘Enable/Disable’
handleChange={func} // Callback function for day select event
```
