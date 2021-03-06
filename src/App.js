import React, { Component } from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { apiBaseUrl } from "./config";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      cityList: [],
      newCityName: "",
      invalidSearchError: false,
      duplicateError: false
    };
  };


  handleInputChange = e => {
    this.setState({ newCityName: e.target.value });
  };


  handleAddCity = e => {
    e.preventDefault();
    this.setState({ 
      error: false,
      invalidSearchError:false,
      duplicateError:false,
    });

    fetch(`${apiBaseUrl}/api/weather/${this.state.newCityName}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        };
        throw new Error(res.status);
      })
      .then(weather => {
        this.setState({ weather });
        fetch(`${apiBaseUrl}/api/cities`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city: this.state.newCityName })
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              console.log("error");
              return res.json().then(error => {
                throw error;
              });
            }
          })
          .then(res => {
            this.getCityList();
            this.setState({ newCityName: "" });
          })
          .catch(error => {
            console.log(error);
            this.setState({ duplicateError: true });
          });
      })
      .catch(error => {
        console.log(error);
        this.setState({ invalidSearchError: true });
      });
  };


  getCityList = () => {
    fetch(`${apiBaseUrl}/api/cities`)
      .then(res => res.json())
      .then(res => {
        this.setState({ cityList: res });
      });
  };


  deleteCity = cityId => {
    this.setState({
      cityList: this.state.cityList.filter(city => {
        return cityId !== city.id;
      })
    });
  };


  handleDelete = cityId => {
    fetch(`${apiBaseUrl}/api/cities/${cityId}`, {
      method: "DELETE"
    }).then(res => {
      if (res.ok) {
        this.deleteCity(cityId);
      }
    });
  };


  handleChangeCity = e => {
    this.getWeather(e);
  };


  getWeather = city => {
    fetch(`${apiBaseUrl}/api/weather/${city}`)
      .then(res => res.json())
      .then(weather => {
        this.setState({ weather });
      });
  };


  getCityList = () => {
    fetch(`${apiBaseUrl}/api/cities`)
      .then(res => res.json())
      .then(res => {
        this.setState({ cityList: res });
      });
  };


  componentDidMount() {
    this.getCityList();
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/">
            <Home
              invalidSearchError={this.state.invalidSearchError}
              duplicateError={this.state.duplicateError}
              handleInputChange={this.handleInputChange}
              handleAddCity={this.handleAddCity}
              handleChangeCity={this.handleChangeCity}
              handleDelete={this.handleDelete}
              newCityName={this.state.newCityName}
              cityList={this.state.cityList}
              weather={this.state.weather}
            ></Home>
          </Route>
        </Switch>
      </Router>
    );
  }

}

export default App;
