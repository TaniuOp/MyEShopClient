import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const Products = () => {

  const [productList, setAllProducts] = useState([])
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        if (productSearch) {
          axios.get(`http://localhost:3000/api/products/?name=${productSearch}`).then((allProducts) => {
            setAllProducts(allProducts.data)
        }) 
      }else {
          axios.get('http://localhost:3000/api/products/').then((allProducts) => {
            setAllProducts(allProducts.data)
          })
        }
      }catch (e) {
    setAllProducts([])
    console.log("We had an error loading the data")
  }
  } fetchProducts()
},[productSearch])


const paintProducts = () => {
  return productList.map((product, i) => <Card productsInfo={product} key={i} />)
}

const handleSubmit = (event) => {
  event.preventDefault();
  const searchedProduct = event.target.searchProduct.value
  setProductSearch(searchedProduct)
}

  return <div>
    <h3>Order by</h3>
    <input type="button" value="name"/>
    <input type="button" value="ratings"/>
    <input type="button" value="price"/>

    <p>Search products:</p>
    <form onSubmit={handleSubmit}>
      <input type="text" name="searchProduct" id="searchProduct"/>
      <button>Search</button>
    </form>

    <h1>Products</h1>

    <>
    {paintProducts()}
    </>

  </div>;
};

export default Products;
