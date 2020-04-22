import React, { Component } from "react";
import "./App.css";
import Home from "./home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
  }

  handleInputChange = e => {
    console.log("stored cities");
    this.setState({ newCityName: e.target.value });
  };

  handleAddCity = e => {
    e.preventDefault();
    console.log(`${apiBaseUrl}/api/weather/${this.state.newCityName}`);
    console.log(this.state.newCityName);

    this.setState({ error: false });
    fetch(`${apiBaseUrl}/api/weather/${this.state.newCityName}`)
      .then(res => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
        //return res.json();
      })
      .then(weather => {
        console.log(weather);
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
            console.log();
          })
          .catch(error => {
            console.log(error);
            console.log("cant duplicate");
            this.setState({ duplicateError: true });
          });
      })
      .catch(error => {
        console.log(error);
        console.log("invalid search");
        
        this.setState({ invalidSearchError: true });
      });
  };



  getCityList = () => {
    fetch(`${apiBaseUrl}/api/cities`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({ cityList: res });
      });
  };

  deleteCity = cityId => {
    this.setState({
      cityList: this.state.cityList.filter(city => {
        return cityId != city.id;
      })
    });
  };
  handleDelete = cityId => {
    console.log("deleted", cityId);

    fetch(`${apiBaseUrl}/api/cities/${cityId}`, {
      method: "DELETE"
    }).then(res => {
      if (res.ok) {
        this.deleteCity(cityId);
      }
    });
  };

  handleChangeCity = e => {
    console.log("city changed to", e);
    this.getWeather(e);
  };

  getWeather = city => {
    fetch(`${apiBaseUrl}/api/weather/${city}`)
      .then(res => res.json())
      .then(weather => {
        console.log(weather);
        this.setState({ weather });
      });
  };

  getCityList = () => {
    fetch(`${apiBaseUrl}/api/cities`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
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
