import React from "react";


const Card = (props) => {

  const moreInfo = () => {
    alert(`Manufacturer: ${props.productsInfo.fk_id_manufacturer}`)
  }

  return <div className="productCard" onClick={moreInfo}>
      <p className="productId">Item number.{props.productsInfo.id}</p>
      <img src={props.productsInfo.image} alt="{props.productsInfo.name}" className="product" />
      <h2>{props.productsInfo.title}</h2>
      <p className="productDescription">{props.productsInfo.description}</p>
      <p className="productReviews">Reviews: {props.productsInfo.reviews} / 5</p>
      <p className="productPrice">{props.productsInfo.price} €</p>
      <p className="productCategory">#{props.productsInfo.category}</p>
  </div>;
};

export default Card;
