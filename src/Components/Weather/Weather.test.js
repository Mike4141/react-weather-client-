import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './Weather';
import renderer from 'react-test-renderer';

// smoke test
it('weather renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(<Weather data={null} />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);

})


//snapshot tests
test('Weather component without data', () => {

    const component = renderer.create(
      <Weather/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


test('Weather component with data', () => {

    const data = {
        coord: {lat: 35.55, lon: -97.4},
        weather: [
        {"id":202,"main":"Thunderstorm","description":"thunderstorm with heavy rain","icon":"11d"},
        {"id":701,"main":"Mist","description":"mist","icon":"50d"}
        ],
        base: "stations",
        main: {feels_like: 59.88, humidity: 100, pressure: 1005},
        visibility: 2414,
        wind: {deg: 30, speed: 6.93},
        clouds: {all: 90},
        dt: 1587576841,
        sys: {country: "US", id: 6021, sunrise: 1587556036},
        timezone: -18000,
        id: 4544356,
        name: "Oklahoma",
        cod: 200
    }

    const component = renderer.create(
      <Weather data={data}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  
});
 