import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Categories.module.css";
import useAuth from "../../../context/useAuth";
import useCategory from "../../../context/useCategory";
import useSub from "../../../context/useSub";
import axios, { axiosPrivate } from "../../../api/axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const DELETE_URI = "/categories-private/";

function Categories() {
  const { categories, setCategories } = useCategory();
  const { setSub } = useSub();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const hanleSubClick = (sub) => {
    setSub(sub);
    navigate(`/console/sub/${sub.nameEn}`);
  };

  const handleDeleteCategory = async (id) => {
    const url = DELETE_URI + id;
    await axiosPrivate.delete(url, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });

    const cats = await axios.get("/categories");
    setCategories(cats);
    console.log(categories);
  };

  return (
    <div className={classes.main}>
      {categories.map((category) => {
        return (
          <Card
            category={category}
            hanleSubClick={hanleSubClick}
            handleDeleteCategory={handleDeleteCategory}
            key={category._id}
          />
        );
      })}
    </div>
  );
}

export default Categories;

const Card = ({ category, hanleSubClick, handleDeleteCategory }) => {
  return (
    <div className={`${classes.card} bg-shadow-top`} key={category.nameEn}>
      <div className={classes.header}>
        <h2 className={`${classes.title} upper`}>{category.nameEn}</h2>
        <p className={classes.count}>
          <span className={`number`}>{category.subs.length}</span> sub
          {category.subs.length === 1 ? "-category" : "-categories"}
        </p>
        <FontAwesomeIcon icon={faPenSquare} className={classes.edit} />
        <FontAwesomeIcon
          icon={faTrashAlt}
          className={classes.trash}
          onClick={() => {
            handleDeleteCategory(category._id);
          }}
        />
        <span className={`${classes.editText} capitalize bg-shadow-all`}>
          edit category
        </span>
      </div>
      <ul className={classes.list}>
        {category.subs.map((sub) => {
          return (
            <li
              className={`${classes.listItem} capitalize`}
              key={sub._id}
              onClick={() => hanleSubClick(sub)}
            >
              {sub.nameEn}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
