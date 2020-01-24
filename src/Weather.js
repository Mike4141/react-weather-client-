import React from "react";

const Weather = props => {
  const { data } = props;

  if (!data) return <div></div>;

  return (
    <div className="city-weather">
      <h2>{data.name}</h2>

      <div className="icon">
        <img
          className="w-i"
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt="Weather Icon"
        />
        <u>
          <span>{data.weather[0].main}</span>&nbsp;
          <span>{Math.floor(data.main.temp)}&deg;F</span>
        </u>
      </div>

      <table className="table">
        <tbody>
          <tr>
            <td>Wind</td>
            <td>{Math.floor(data.wind.speed)} km/h</td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td>{Math.floor(data.main.pressure)} hPa</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>{Math.floor(data.main.humidity)}%</td>
          </tr>
          <tr>
            <td>Min Temp</td>
            <td>{Math.floor(data.main.temp_min)}&deg;F</td>
          </tr>
          <tr>
            <td>Max Temp</td>
            <td>{Math.floor(data.main.temp_max)}&deg;F</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Weather;
