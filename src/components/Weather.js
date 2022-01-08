import React from "react";

const Weather = (props) => {
  const temperature = Math.round(props.temp);
  console.log('weather', props.error)

  return (
    <div>
      { props.city &&
        <>
          <p>Местоположение: {props.city}</p>
          <p>Температура: {temperature}, <span>&#8451;</span></p>
          <p>Атмосферное давление: {props.pressure * 0.75}, мм рт ст</p>
        </>
      } 
      <p>{props.error}</p>
    </div>
  );
}

export default Weather;