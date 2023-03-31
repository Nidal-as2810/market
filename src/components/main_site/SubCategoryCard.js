import React, { useState, useEffect } from "react";
import classes from "./SubCategoryCard.module.css";
import useItems from "../../context/useItems";
import MainPageCards from "./MainPageCards";

function SubCategoryCard() {
  const { items } = useItems();
  const [showItems, setShowItems] = useState([]);

  useEffect(() => {
    function randomItemsList(itemsList) {
      let max = itemsList.length < 20 ? itemsList.length : 20;
      return [...itemsList]
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
        .slice(0, max);
    }
    setShowItems(randomItemsList(items));
  }, [items]);

  return (
    <div className={`${classes.main}`}>
      {showItems.map((item, index) => {
        return <MainPageCards item={item} index={index} key={index} />;
      })}
    </div>
  );
}

export default SubCategoryCard;
