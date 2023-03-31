import React, { useState } from "react";
import classes from "./AddItem.module.css";
import useCategory from "../../../context/useCategory";
import { get } from "../../../api/crud";
import useAxiosPrivate from "../../../context/useAxiosPrivate";

const ITEM_URL = "/categories-item";

function AddItem() {
  const axiosPrivate = useAxiosPrivate();
  const { categories, setCategories } = useCategory();
  const [subCategories, setSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [message, setMessage] = useState("");
  const [messageٍStyle, setMessageStyle] = useState({ color: "green" });
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("piece");

  const handleImageAdd = () => {
    let arr = [];
    if (files.length) {
      arr = files;
    }
    arr.push(image);
    setFiles(arr);
    setImage("");
  };
  const handleRemoveImage = (index) => {
    const arr = files[index];
    const newArray = files.filter((val) => val !== arr);
    setFiles(newArray);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || !price || !quantity) {
      setMessage("All fields are required.");
      setMessageStyle({ color: "red" });
      return;
    }
    if (!unit) {
      setUnit("piece");
    }

    const item = {
      categoryId,
      subId: subCategoryId,
      name: itemName,
      description,
      price,
      quantity,
      unit,
      images: files,
    };

    const response = await axiosPrivate.post(ITEM_URL, item);
    console.log(response);
    if (response.status === 200) {
      setMessageStyle({ color: "green" });
      setDescription("");
      setItemName("");
      setPrice(0);
      setQuantity(0);
      setUnit("piece");
      setFiles([]);
      let cats = await get("/categories");
      setCategories(cats);
    } else {
      setMessageStyle({ color: "red" });
    }
    setMessage(response.message);
  };
  return (
    <div className={`${classes.main}`}>
      <div className={`${classes.header} bg-shadow-bottom`}>
        <h2 className={`capitalize ${classes.title}`}>add new item</h2>
      </div>
      <div className={`${classes.body} bg-shadow-top`}>
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={classes.formItem}>
            <label htmlFor="nameEn">Choose Category</label>
            <select
              className={`${classes.input}`}
              onChange={(e) => {
                setSubCategories(categories[e.target.selectedIndex - 1].subs);
                setCategoryId(e.target.value);
              }}
              value={categoryId}
            >
              <option value="">Select a category</option>
              {categories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.nameEn}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={classes.formItem}>
            <label htmlFor="nameEn">Choose Sub-Category</label>
            <select
              className={`${classes.input}`}
              onChange={(e) => setSubCategoryId(e.target.value)}
              value={subCategoryId}
            >
              <option value="">Select a sub-category</option>
              {subCategories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.nameEn}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={classes.formItem}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className={`${classes.input} en`}
              autoComplete="off"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
          </div>
          <div className={`${classes.formItem} ${classes.textarea}`}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              type="text"
              className={`${classes.input} ${classes.textareaA} en`}
              cols="40"
              rows="5"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              className={`${classes.input} en`}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              className={`${classes.input} en`}
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="unit">Unit</label>
            <input
              id="unit"
              type="text"
              className={`${classes.input} en`}
              autoComplete="off"
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="image">Image URL</label>
            <div className={classes.imagesUpload}>
              <input
                id="image"
                type="text"
                className={`${classes.input} en`}
                autoComplete="off"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
              <span className={classes.add} onClick={handleImageAdd}>
                +
              </span>
            </div>
          </div>
          <div className={classes.formItem}>
            <button className={`${classes.button} bg-shadow-bottom upper`}>
              save
            </button>
          </div>
          <p className={classes.message} style={messageٍStyle}>
            {message}
          </p>
        </form>
        <div className={classes.imagesContainer}>
          {files.map((img, index) => {
            return (
              <ImageDisplay
                myImage={img}
                index={index}
                handleRemoveImage={handleRemoveImage}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AddItem;

const ImageDisplay = ({ myImage, index, handleRemoveImage }) => {
  return (
    <div className={`${classes.imageDisplay} bg-shadow-bottom`} key={index}>
      <img src={myImage} alt="img" className={classes.img} />

      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className={classes.icon}
          onClick={() => handleRemoveImage(index)}
        >
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
        </svg>
      </span>
    </div>
  );
};
