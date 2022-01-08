import React from "react";

const Form = (props) => (
  <form className="form" onSubmit={props.weatherMethod}>
    <input 
      type="text" 
      name="city" 
      placeholder="Город" 
      className="form__input"
    />
    <button className="form__button" id="form__button">Узнать погоду</button>
  </form>
);

export default Form;