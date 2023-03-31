import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import useAuth from "../../context/useAuth";
import useCategory from "../../context/useCategory";
import useSub from "../../context/useSub";
import useTempOrder from "../../context/useTempOrder.js";
import logo from "../../assets/icons/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCartPlus,
  faHeart,
  faAddressBook,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { get } from "../../api/crud";

import { Link, useNavigate } from "react-router-dom";

const CategoriesMenu = ({ category }) => {
  const navigate = useNavigate();
  const { setSub } = useSub();

  const handleSubSelect = (sub) => {
    setSub(sub);
    const distination = `/category/${sub.nameEn}`;
    navigate(distination, { replace: true });
  };

  return (
    <li className="menu-item category-item capitalize" key={category._id}>
      {category.nameEn}
      <ul className="sub-menu">
        {category.subs.map((sub) => {
          return (
            <li key={Math.random()} onClick={() => handleSubSelect(sub)}>
              {sub.nameEn}
            </li>
          );
        })}
      </ul>
    </li>
  );
};

function MainSite() {
  const { auth, setAuth } = useAuth();
  const { tempOrder, setTempOrder } = useTempOrder();
  const [displayName, setDispalyName] = useState("");
  const { categories } = useCategory();
  const [categoryMenuMiniScreenDisplay, setCategoryMenuMiniScreenDisplay] =
    useState("category-menu");

  useEffect(() => {
    let letters = "";
    if (auth.username) {
      letters = auth.username[0];
    }
    setDispalyName(letters);
  }, [auth]);

  const handleLogout = async () => {
    await get("/logout");
    setAuth({});
    setTempOrder({});
  };

  const handleShowCategoryMenu = () => {
    if (categoryMenuMiniScreenDisplay === "category-menu-show") {
      setCategoryMenuMiniScreenDisplay("category-menu");
    } else {
      setCategoryMenuMiniScreenDisplay("category-menu-show");
    }
  };
  return (
    <div className="main-container">
      <nav className="navbar bg-shadow">
        <div className="top-nav">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="click market" className="image bg-shadow" />
            </Link>
          </div>
          <form className="search">
            <input type="text" id="search-input" placeholder="Search" />
            <button className="button">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </button>
          </form>
          <ul className={`menu  ${auth.username ? "hide" : ""}`}>
            <li className="capitalize menu-item ">
              <Link className="link" to="/register">
                sign up
              </Link>
            </li>
            <li className="capitalize menu-item">
              <Link className="link" to="/login">
                sign in
              </Link>
            </li>
          </ul>
          <ul className={`menu  ${auth.username ? "" : "hide"}`}>
            <li className="capitalize menu-item" onClick={handleLogout}>
              sign out
            </li>
            <li className="capitalize menu-item menu-icon">
              <Link to="/cart" className="link">
                <FontAwesomeIcon icon={faCartPlus} />
                <span className="number icon-numbers">
                  {tempOrder?.totalDifferentItems}
                </span>
              </Link>
            </li>
            {/* <li className={`capitalize menu-item menu-icon `}>
              <FontAwesomeIcon icon={faHeart} />
              <span className="number icon-numbers">13</span>
            </li> */}
            <li
              className={`capitalize menu-item ${
                auth?.roles?.includes(2000) || auth?.roles?.includes(1000)
                  ? ""
                  : "hide"
              }`}
            >
              <Link className="link" to="/console">
                console
              </Link>
            </li>
            <li className="upper menu-item menu-icon">{displayName}</li>
          </ul>
        </div>
        <div className="bottom-nav">
          <span className="mini-menu" onClick={handleShowCategoryMenu}>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <ul
            className={`menu ${
              window.screen.width < 600
                ? categoryMenuMiniScreenDisplay
                : "category-menu"
            }`}
          >
            {categories.map((category, index) => {
              return <CategoriesMenu category={category} key={index} />;
            })}
          </ul>
        </div>
      </nav>
      <div className="nav-placeholder"></div>
      <div className="main-body">
        <Outlet />
      </div>
      <footer>
        <div className="contact">
          <div className="contact-item">
            <FontAwesomeIcon icon={faAddressBook} />
            <span>Address:</span>
            <span>Universe, Solar System 3rd Planet</span>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faPhone} />
            <span>Phone:</span>
            <span>000 0000 000000</span>
          </div>
        </div>
        <div className="copy">COPYRIGHT &copy; 2023 Click Market</div>
      </footer>
    </div>
  );
}

export default MainSite;
