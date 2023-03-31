import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Menu.module.css";
import useAuth from "../context/useAuth";
import { get } from "../api/crud";
import Accordion from "./menu/Accordion";

const menues = [
  {
    title: "users",
    links: [
      { title: "users", link: "/users" },
      { title: "delete user", link: "/delete-user" },
    ],
  },
  {
    title: "store",
    links: [
      { title: "add category", link: "/console/add-category" },
      { title: "list categories", link: "/console/categories" },
      { title: "add sub Categry", link: "/console/add-subCategory" },
      { title: "Add Item", link: "/console/add-item" },
    ],
  },
];

function Menu() {
  const { setAuth } = useAuth();
  const handleLogout = async () => {
    await get("/logout");
    setAuth({});
  };

  return (
    <div className={classes.main}>
      <Link to="/" className={`${classes.btn} capitalize`}>
        go to main site
      </Link>
      <button onClick={handleLogout} className={`${classes.btn} capitalize`}>
        Sign out
      </button>
      {menues.map((menu, index) => {
        return <Accordion menu={menu} key={index} />;
      })}
    </div>
  );
}

export default Menu;
