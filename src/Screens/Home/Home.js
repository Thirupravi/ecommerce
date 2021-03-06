import React, { useState, useContext, createRef } from "react";
import "./Home.css";

import { DataContext } from "../../Data/DataContext";

//Components
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import Pagination from "../../Components/Pagination/Pagination";
import CardTop from "../../Components/CardTop/CardTop";
import Modal from "../../Components/Modal/Modal";

const CATEGORIES = [
  { name: "All" },
  { name: "Books" },
  { name: "Hoodie/T-shirt" },
  { name: "Bags" },
  { name: "Mics" },
];

export default function Home() {
  const [
    Products,
    setProducts,
    SelectedCategory,
    setSelectedCategory,
    sort,
    setSort,
    currentProducts,
    setSortedProduct,
    paginate,
    currentPage,
  ] = useContext(DataContext);

  const rangeref = createRef();

  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (name) => {
    setSelectedCategory(name);
  };

  const handleFilter = () => {
    console.log(rangeref.current.value);
  };
  const handleAddproduct = () => {
    setIsOpen(true);
  };

  const handleSorting = (e) => {
    setSortedProduct([]);
    setSort(e.target.value);
  };
  let min = Products.length
    ? Math.min.apply(
        null,
        Products.map(function (item) {
          return item.price;
        })
      )
    : 0;
  let max = Products.length
    ? Math.max.apply(
        null,
        Products.map(function (item) {
          return item.price;
        })
      )
    : 10;

  return (
    <div className="home">
      <Header handleAddproduct={handleAddproduct} />
      <div className="container">
        <div className="side_container">
          <h3>CATEGORIES</h3>
          <div className="categorieslist">
            {CATEGORIES.map((item) => (
              <p
                key={item.name}
                onClick={() => {
                  handleCategoryClick(item.name);
                }}
              >
                {item.name}
              </p>
            ))}
          </div>
          <h3>FILTER BY PRICE</h3>
          <input
            className="input"
            type="range"
            id="vol"
            name="vol"
            min={min}
            max={max}
            defaultValue={min}
            ref={rangeref}
          />
          <div className="filter_bottom">
            <button onClick={handleFilter}>Filter</button>
            <p>{`Price: $${min}-$${max}`}</p>
          </div>
          <h3>TOP PRODUCTS</h3>
          {currentProducts
            .filter((i) => i.topproduct === true)
            .map((item) => (
              <CardTop
                key={item.title}
                image={item.image}
                title={item.title}
                rating={5}
                price={item.price}
              />
            ))}
        </div>
        <div className="main_container">
          <div className="main_container_header">
            <p>{`Showing ${
              currentPage === 1
                ? currentPage
                : currentPage + currentProducts.length
            } - ${currentProducts.length} of ${Products.length} results`}</p>
            <select
              name="dropdown"
              onChange={handleSorting}
              defaultValue="default"
            >
              <option value="default">Default sorting</option>
              <option value="high">Price High to low</option>
              <option value="low">Price Low to high</option>
            </select>
          </div>
          <div className="card_container">
            {SelectedCategory === "All"
              ? currentProducts.map((product) => (
                  <Card
                    key={product.title}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    categories={CATEGORIES}
                  />
                ))
              : currentProducts
                  .filter((item) => item.category === SelectedCategory)
                  .map((product) => (
                    <Card
                      key={product.title}
                      image={product.image}
                      title={product.title}
                      price={product.price}
                    />
                  ))}
          </div>
          <Pagination
            postsPerPage={9}
            totalPosts={Products.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            categories={CATEGORIES}
          ></Modal>
        </div>
      </div>
    </div>
  );
}
