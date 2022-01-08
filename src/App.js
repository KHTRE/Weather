import React from "react";
import Info from "./components/Info";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "3b358a8d1f9112fec94b2053dea81d8c";

// Get user's city
let baseCity = '';
fetch('https://extreme-ip-lookup.com/json/?key=ShlUFaRmsfAKK67LzO49')
  .then( res => res.json())
  .then(response => {
    baseCity = response.city;
  })

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    error: undefined,
    time: undefined,
    sunrise: undefined,
    sunset: undefined,
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value || baseCity;

    if (city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`);

      const data = await api_url.json();
      const formButton = document.getElementById('form__button');

      //Dark theme for night time

      if (data.cod !== '404') {
        if (data.dt < data.sys.sunrise || data.dt > data.sys.sunset) {
          document.body.classList.add('body--dark');
          formButton.classList.add('form__button--dark');
        } else {
          document.body.classList.remove('body--dark');
          formButton.classList.remove('form__button--dark');
        }
    
        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          pressure: data.main.pressure,
          error: undefined,
          time: undefined,
          sunrise: undefined,
          sunset: undefined,
        });
      } else {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          pressure: undefined,
          error: 'Город не найден',
          time: undefined,
          sunrise: undefined,
          sunset: undefined,
        });
      }

      // Эта часть нужна на тот случай, если город не введен и он не может автоматом определиться.
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        error: 'Город не найден',
        time: undefined,
        sunrise: undefined,
        sunset: undefined,
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Info />
        <Form weatherMethod={this.getWeather} />
        <Weather
          temp={this.state.temp}
          city={this.state.city}
          country={this.state.country}
          pressure={this.state.pressure}
          error={this.state.error}
          time={this.state.time}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset}
        />
      </div>
    );
  }
}

export default App;
