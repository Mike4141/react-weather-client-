import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './Weather';

// this is the test case
it('weather renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(<Weather data={null} />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);

})