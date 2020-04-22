import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import renderer from 'react-test-renderer';

//test data
const props = {
    invalidSearchError: false,
    duplicateError: false,
    handleInputChange: () => { },
    handleAddCity: () => { },
    handleChangeCity: () => { },
    handleDelete: () => { },
    newCityName: '',
    cityList: [],
    weather: ''
}

const cityList = [
    {
        "id": 2,
        "name": "New York",
        "created_at": "2020-04-22T14:08:11.002Z"
    },
    {
        "id": 3,
        "name": "Oklahoma",
        "created_at": "2020-04-22T14:09:00.764Z"
    },
    {
        "id": 9,
        "name": "Toronto",
        "created_at": "2020-04-22T15:13:28.699Z"
    },
    {
        "id": 10,
        "name": "Seattle",
        "created_at": "2020-04-22T15:15:17.424Z"
    },
    {
        "id": 11,
        "name": "dallas",
        "created_at": "2020-04-22T16:15:20.228Z"
    }
]

// smoke tests
it('renders without crashing with inititial state', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home {...props} />, div);
    // clean up code
    ReactDOM.unmountComponentAtNode(div);

})

it('renders without crashing with city list', () => {
    props.cityList = cityList
    const div = document.createElement('div');
    ReactDOM.render(<Home {...props} />, div);
    // clean up code
    ReactDOM.unmountComponentAtNode(div);

})

//snapshot tests
test('Home component with initial data', () => {
    const component = renderer.create(
        <Home {...props} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


test('Home component on duplicate entry', () => {
    props.duplicateError = true
    const component = renderer.create(
        <Home {...props} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


test('Home component on invalid search', () => {
    props.invalidSearchError = true
    const component = renderer.create(
        <Home {...props} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

