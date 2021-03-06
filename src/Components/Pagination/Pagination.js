import React from "react";
import "./Pagination.css";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number}>
          <a
            onClick={() => paginate(number)}
            href="!#"
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </a>
        </li>
      ))}
    </ul>
  );
}
