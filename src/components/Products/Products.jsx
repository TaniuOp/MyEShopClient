import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const Products = () => {

  const [productList, setAllProducts] = useState([]) // Product list (used to paint the cards )
  const [productSearch, setProductSearch] = useState(''); // Searched text 
  const [inputValue, setinputValue] = useState(); //Input value 
  const [orderProducts, setOrder] = useState(''); //Order by 


  useEffect(() => {
    async function fetchProducts() {
      try {
        if (productSearch) {
          axios.get(`http://localhost:3000/api/products/?title=${productSearch}`).then((allProducts) => {
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
    return productList.map((products, i) => <Card productsInfo={products} key={i} />)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchedProduct = event.target.searchProduct.value
    setProductSearch(searchedProduct)
  }

  // Reset filters 
  const resetFilters = (e) => {
    axios.get('http://localhost:3000/api/products/').then((allProducts) => {
      setAllProducts(allProducts.data)
    })
    resetHooks()
  }

  const resetHooks = () => {
    setProductSearch('')
    setOrder('none')
    setinputValue()
  }
  // Probar poniendo el id / value en ""

  // Order items 
  const sortProducts = (event) => {
    setOrder(event.target.value)
  }
  productList.sort((a, b) => {
    switch (orderProducts) {
      case 'Cheapest':
        return a.price - b.price;
      case 'Expensive':
        return b.price - a.price;
      case 'Top':
        return b.reviews - a.reviews;
      case 'Less':
        return a.reviews - b.reviews;
      case 'A-Z':
        return a.title.localeCompare(b.title);
      case 'Z-A':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  })


  return <div>


    <p>Search products:</p>
    <form onSubmit={handleSubmit}>
      <input type="text" name="searchProduct" id="searchProduct" value={inputValue} />
      <button>Search</button>
    </form>

    <h3>Order by</h3>
    <div className="sortBy">
      <select onChange={sortProducts}>
        <option value="none">Order by:</option>
        <option value="Cheapest">Price (ascending)</option>
        <option value="Expensive">Price (descending)</option>
        <option value="Top">Best reviews</option>
        <option value="Less">Less reviews</option>
        <option value="A-Z">Alphabetical order</option>
        <option value="Z-A">From Z to A </option>
      </select>
    </div>

    <button onClick={resetFilters}>Reset filters</button>

    <h1>Products</h1>
    {productList === "" ?
      <p>No products found. Try another search.</p> :
      <p> {productSearch} </p>}
    <div className="container">
      <> {paintProducts()} </></div>
  </div>;
};

export default Products;
