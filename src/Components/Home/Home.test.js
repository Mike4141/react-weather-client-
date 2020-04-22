import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

// this is the test case
it('home renders without crashing', () => {
  const div = document.createElement('div');

  const props = {
    invalidSearchError:false,
    duplicateError:false,
    handleInputChange:()=>{},
    handleAddCity:()=>{},
    handleChangeCity:()=>{},
    handleDelete:()=>{},
    newCityName:'',
    cityList:[],
    weather:''
  }
  
  ReactDOM.render(<Home {...props} />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);

})