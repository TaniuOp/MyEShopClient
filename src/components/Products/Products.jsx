import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const Products = () => {

  const [productList, setAllProducts] = useState([])
  const [productSearch, setProductSearch] = useState("");
  const [inputValue, setinputValue] = useState();


  useEffect(() => {
    async function fetchProducts() {
      try {
        if (productSearch) {
          axios.get(`http://localhost:3000/api/products/?name=${productSearch}`).then((allProducts) => {
            setAllProducts(allProducts.data)
          })
        } else {
          axios.get('http://localhost:3000/api/products/').then((allProducts) => {
            setAllProducts(allProducts.data)
          })
        }
      } catch (e) {
        setAllProducts([])
        console.log("We had an error loading the data")
      }
    } fetchProducts()
  }, [productSearch])

  const paintProducts = () => {
    return productList.map((product, i) => <Card productsInfo={product} key={i} />)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchedProduct = event.target.searchProduct.value
    setProductSearch(searchedProduct)
  }

  const resetFilters = (e) => {
    setProductSearch("")
    axios.get('http://localhost:3000/api/products/').then((allProducts) => {
      setAllProducts(allProducts.data)
    })
    setinputValue(() => "")
  }

  const sortByName = () => {
    var sortByNameA = productList.sort((a, b) =>
      a.name.localeCompare(b.name)
    )
    setAllProducts(sortByNameA)
    console.log(sortByNameA)
    paintProducts(sortByNameA)
  }

  return <div>
    <h3>Order by</h3>
    <input type="button" value="name" onClick={sortByName} />
    <input type="button" value="ratings" />
    <input type="button" value="price" />

    <p>Search products:</p>
    <form onSubmit={handleSubmit}>
      <input type="text" name="searchProduct" id="searchProduct" value={inputValue} />
      <button>Search</button>
    </form>

    <button onClick={resetFilters}>Reset filters</button>

    <h1>Products</h1>
    {productList === "" ?
      <p>No products found. Try another search.</p> :
      <p> {productSearch} </p>}
    <> {paintProducts()} </>
  </div>;
};

export default Products;
