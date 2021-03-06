import React, { useState, useRef, useContext } from "react";
import ReactDom from "react-dom";
import "./Modal.css";

import { DataContext } from "../../Data/DataContext";

export default function Modal({ open, onClose, categories }) {
  const [Products, setProducts] = useContext(DataContext);
  const [isValid, setIsValid] = useState(true);
  //Form value handlers
  const priceref = useRef();
  const titleRef = useRef();
  const imageref = useRef();
  const categoryref = useRef();
  const topref = useRef();

  if (!open) return null;
  let base64 = "";
  const encodeImageFileAsURL = () => {
    var file = imageref.current.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      // console.log("RESULT", reader.result);
      base64 = reader.result;
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      categoryref.current.value &&
      titleRef.current.value &&
      priceref.current.value &&
      imageref.current.value
    ) {
      setIsValid(true);
      onClose();
      setProducts((prevState) => [
        ...prevState,
        {
          title: titleRef.current.value,
          category: categoryref.current.value,
          price: parseInt(priceref.current.value),
          topproduct: topref.current.checked,
          image: base64,
        },
      ]);
    } else {
      console.log({
        title: titleRef.current.value,
        category: categoryref.current.value,
        price: priceref.current.value,
        topproduct: topref.current.checked,
        image: imageref.current.value,
      });
      setIsValid(false);
    }
  };
  const handleClose = async () => {
    setIsValid(true);
    onClose();
  };

  return ReactDom.createPortal(
    <>
      <div className="overlay_style" />
      <div className="modal_style">
        <h1 style={{ textAlign: "center" }}>Add product</h1>
        <div className="modal_container">
          <div className="form_container">
            <label htmlFor="category">Product category:</label>
            <input type="text" name="item" list="itemnames" ref={categoryref} />
            <datalist id="itemnames">
              {categories
                .filter((e) => e.name !== "All")
                .map((item) => (
                  <option key={item.name} value={item.name} />
                ))}
            </datalist>
            {!isValid ? (
              <span style={{ color: "red" }}>Please select the category</span>
            ) : (
              ""
            )}
            <label htmlFor="fname">Product Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter product title"
              ref={titleRef}
            />
            {!isValid ? (
              <span style={{ color: "red" }}>Please enter the title</span>
            ) : (
              ""
            )}
            <label htmlFor="price">Price :</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              ref={priceref}
            />
            {!isValid ? (
              <span style={{ color: "red" }}>Please enter the price</span>
            ) : (
              ""
            )}
            <label htmlFor="topproduct">Top product</label>
            <input
              type="checkbox"
              id="topproduct"
              name="topproduct"
              className="inputs"
              ref={topref}
            />
            <label>Choose File:</label>
            <input
              type="file"
              name="file"
              id="fileInput"
              className="inputs"
              ref={imageref}
              onChange={encodeImageFileAsURL}
            ></input>
            {!isValid ? (
              <span style={{ color: "red" }}>Please upload image</span>
            ) : (
              ""
            )}
            <div className="button_container">
              <button
                onClick={handleClose}
                style={{
                  backgroundColor: "#cccccc",
                  color: "black",
                }}
              >
                CANCEL
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #f87755, #fa445a)",
                }}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
