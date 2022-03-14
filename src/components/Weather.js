import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [temp, setTemp] = useState(0);
  const [isFaren, setIsFarent] = useState(true);

  const success = (pos) => {
    console.log(pos.coords);
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c98e851abf02fdda75cc3d9e5f39a861`
      )
      .then((res) => {
        setWeather(res.data);
        setTemp(res.data?.main.temp);
      });
  };

  const changeDegree = () => {
    if (isFaren) {
      setIsFarent(false);
    } else {
      setIsFarent(true);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  console.log(weather);
  document.body.style = "backgroun:#5DADE2";
  return (
    <div className="card">
      <h2 id="title">Weather app</h2>
      <p id="location">
        <b>
          {weather.name}, {weather.sys?.country}{" "}
        </b>
      </p>
      {weather.weather?.[0].icon === undefined ? (
        <p>Loading...</p>
      ) : (
        <img
          id="img"
          src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
          alt=""
        ></img>
      )}

      <ul id="information">
        <p className="values">
          <b>"{weather.weather?.[0].description}"</b>
        </p>
        <li className="values">
          <i className="fa-solid fa-wind"></i>
          <b>Wind speed</b> {weather.wind?.speed} m/s
        </li>
        <li className="values">
          <i className="fa-solid fa-cloud"></i>
          <b>Clouds:</b> {weather.clouds?.all}%
        </li>
        <li className="values">
          <i className="fa-solid fa-temperature-half"></i>
          <b>Pressures</b> {weather.main?.pressure}mb
        </li>
      </ul>
      <b>
        {isFaren ? (
          <p>{`${((temp - 273) * 1.8 + 32).toFixed(0)} °F `}</p>
        ) : (
          <p>{`${(temp - 273).toFixed(0)} °C`}</p>
        )}
      </b>
      <button onClick={changeDegree}>Degrees °F/°G</button>
    </div>
  );
};

export default Weather;
