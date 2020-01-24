import React, { Component } from "react";
import Weather from "./Weather";

class Home extends Component {
  render() {
    console.log(this.props.cityList);
    return (
      <div className="centered">
        <div className="navbar">
          <h1>My Weather</h1>
        </div>

        <form onSubmit={this.props.handleAddCity} className="bg">
          <h1>MyWeather</h1>

          <p>The current weather for your favorite cities!</p>

          {this.props.error && <p>Invalid Search</p>}
          {/* handleInputChange = e => {
    console.log("stored cities");
    this.setState({ newCityName: e.target.value });
  };

  handleAddCity = e => {
    e.preventDefault();
    console.log(`/api/weather/${this.state.newCityName}`);
    console.log(this.state.newCityName);

    this.setState({ error: false });
    fetch(`/api/weather/${this.state.newCityName}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .then(weather => {
        console.log(weather);
        this.setState({ weather });
        fetch("/api/cities", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city: this.state.newCityName })
        })
          .then(res => res.json())
          .then(res => {
            this.getCityList();
            this.setState({ newCityName: "" });
            console.log();
          });
      })
      .catch(() => {
        console.log("invalid search");
        this.setState({ error: true });
     });
  }; */}


    
            <input
              placeholder="New city name..."
              type="text"
              class="form-control"
              value=""
              value={this.props.newCityName}
              onChange={this.props.handleInputChange}
              required
            />
            {/* handleInputChange = e => {
    console.log("stored cities");
    this.setState({ newCityName: e.target.value });
  }; */}





            <button className="btn" color="primary">
              Add City
            </button>
        </form>
        <h1 className="current">Current Weather</h1>





        <div className="select">
          {this.props.cityList.length === 0 && <li>No cities added yet.</li>}
          {this.props.cityList.length > 0 && <li>Select a city.</li>}
        </div>
        {/* class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      cityList: [],
      newCityName: "",
      error: false
    };
  } */}


        <ul className="cities">
          {this.props.cityList.map(
            (city, i) =>
              console.log(city) || (
                <li className="ct" key={i}>
                  <span onClick={() => this.props.handleChangeCity(city.name)}>
                    {city.name}
                  </span>
                  {/* handleChangeCity = e => {
                    console.log("city changed to", e);
                    this.getWeather(e);
                  }; */}



                  <button
                    className="delete-btn"
                    onClick={() => this.props.handleDelete(city.id)}
                  >
                    Delete
                  </button>
                </li>
                  // deleteCity = cityId => {
                  //   this.setState({
                  //     cityList: this.state.cityList.filter(city => {
                  //       return cityId != city.id;
                  //     })
                  //   });
                  // };
                  // handleDelete = cityId => {
                  //   console.log("deleted", cityId);
                
                  //   fetch(`/api/cities/${cityId}`, {
                  //     method: "DELETE"
                  //   }).then(res => {
                  //     if (res.ok) {
                  //       this.deleteCity(cityId);
                  //     }
                  //   });
                  // };
                
              )
          )}
        </ul>

        <Weather data={this.props.weather} />
        {/* getWeather = city => {
    fetch(`/api/weather/${city}`)
      .then(res => res.json())
      .then(weather => {
        console.log(weather);
        this.setState({ weather });
      }); */}
  

      </div>
    );
  }
}

export default Home;
