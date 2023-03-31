import React from "react";
import classes from "./CategoryItems.module.css";
import useSub from "../../context/useSub";
import MainPageCards from "./MainPageCards";

function CategoryItems() {
  const { sub } = useSub();

  if (!sub?.items?.length) {
    return <></>;
  }

  return (
    <div className={classes.subMain}>
      <div className={classes.header}>
        <h2 className={`upper ${classes.title}`}>{sub.nameEn}</h2>
        <span>
          <span className="number">{sub.items.length}</span>
          {sub.items.length === 1 ? " Item" : " Items"}
        </span>
      </div>
      <div className={classes.sub}>
        {sub.items.map((item, index) => {
          return <MainPageCards item={item} index={index} key={item._id} />;
        })}
      </div>
    </div>
  );
}

export default CategoryItems;
