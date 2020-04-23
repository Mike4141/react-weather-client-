import React, { Component } from "react";
import Weather from "../Weather/Weather";

class Home extends Component {

  render() {

    return (
      <div>
        <div className="navbar">
          <link
            href="https://fonts.googleapis.com/css?family=Bangers&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Bangers|Bowlby+One+SC&display=swap"
            rel="stylesheet"
          />
          <h2>My Weather</h2>
        </div>

        <main>
          <div className="bg">
            <form onSubmit={this.props.handleAddCity}>
              <div className="w-header">
                <h1>My Weather</h1>
              </div>

              <div className="changes">
                <p>The current weather for your favorite cities!</p>
              </div>

              <div className="changes">
                {this.props.invalidSearchError && <p>invalid search</p>}

              </div>

              <div className="changes">
                {this.props.duplicateError && <p>City Already Exist</p>}
              </div>

              <div className="flex">
                <input
                  placeholder="New city name..."
                  type="text"
                  value=""
                  value={this.props.newCityName}
                  onChange={this.props.handleInputChange}
                  required
                />

                <button className="btn" color="primary">
                  Add City
                </button>
              </div>
            </form>
          </div>
        </main>

        <div className="select">
          {this.props.cityList.length === 0 && <li>No cities added yet.</li>}
          {this.props.cityList.length > 0 && <li>Select a city.</li>}
        </div>

        <div className="cities">
          <ul>
            {this.props.cityList.map(
              (city, i) =>
                console.log(city) || (
                  <li className="ct" key={i}>
                    <span
                      className="selector"
                      onClick={() => this.props.handleChangeCity(city.name)}
                    >
                      {city.name}
                    </span>

                    <button
                      className="delete-btn"
                      onClick={() => this.props.handleDelete(city.id)}
                    >
                      Delete
                    </button>
                  </li>
                )
            )}
          </ul>
        </div>

        <Weather data={this.props.weather} />
      </div>
    );
  }
}

export default Home;
