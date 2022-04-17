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
    <section className="card-container">
      <div className="card">
        <div className="location-container color-basic">
          <h2 className="title">Weather app</h2>
          <p className="location">
            <b>
              {weather.name}, {weather.sys?.country}{" "}
            </b>
          </p>
        </div>

        <div className="description-container">
          {weather.weather?.[0].icon === undefined ? (
            <p>Loading...</p>
          ) : (
            <img
              id="img"
              src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
              alt=""
            ></img>
          )}

          <div className="info-container">
            <ul>
              <p className="values color-basic">
                <b>"{weather.weather?.[0].description}"</b>
              </p>
              <li className="values">
                <i className="fa-solid fa-wind color-basic"></i>
                <b className="color-basic">Wind speed</b> {weather.wind?.speed}{" "}
                m/s
              </li>
              <li className="values">
                <i className="fa-solid fa-cloud color-basic"></i>
                <b className="color-basic">Clouds:</b> {weather.clouds?.all}%
              </li>
              <li className="values">
                <i className="fa-solid fa-temperature-half color-basic"></i>
                <b className="color-basic">Pressures</b>{" "}
                {weather.main?.pressure}mb
              </li>
            </ul>
          </div>
        </div>

        <p className="dg-fh">
          {isFaren ? (
            <b>{`${((temp - 273) * 1.8 + 32).toFixed(0)} °F `}</b>
          ) : (
            <b>{`${(temp - 273).toFixed(0)} °C`}</b>
          )}
        </p>
        <div className="button-container">
          <button onClick={changeDegree}>Degrees °F/°G</button>
        </div>
      </div>
    </section>
  );
};

export default Weather;
