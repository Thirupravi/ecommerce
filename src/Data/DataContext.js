import React, { useState, createContext, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [Products, setProducts] = useState([]);
  const [SortedProduct, setSortedProduct] = useState(Products.sort());
  const [sort, setSort] = useState("default");
  const [SelectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  function SortByDefault(a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }
  function SortByhigh(a, b) {
    if (a.price < b.price) {
      return 1;
    }
    if (a.price > b.price) {
      return -1;
    }
    return 0;
  }
  function SortByLow(a, b) {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  }
  useEffect(() => {
    if (sort === "default") {
      setSortedProduct(Products.sort(SortByDefault));
    } else if (sort === "high") {
      setSortedProduct(Products.sort(SortByhigh));
    } else if (sort === "low") {
      setSortedProduct(Products.sort(SortByLow));
    }
  }, [sort, Products]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProducts = SortedProduct.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <DataContext.Provider
      value={[
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
      ]}
    >
      {props.children}
    </DataContext.Provider>
  );
};
