import React from "react";

const Card = (props) => {
  return <div>
    <img src={props.productsInfo.img} alt="{props.productsInfo.name}"/>
    <h1>{props.productsInfo.name}</h1>
    <h2>{props.productsInfo.price}</h2>
    <h2>{props.productsInfo.review}</h2>
    <h2>{props.productsInfo.created}</h2>
    <h5>{props.productsInfo.id}</h5>
  </div>;
};

export default Card;
