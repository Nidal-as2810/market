import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SubCategoryItems.module.css";
import useCategory from "../../../context/useCategory";
import useSub from "../../../context/useSub";
import useSelectedItem from "../../../context/useSelectedItem";
import useAxiosPrivate from "../../../context/useAxiosPrivate";
import { get } from "../../../api/crud";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function SubCategoryItems() {
  const { sub } = useSub();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (sub) {
      let itemList = sub.items;
      setItems(itemList);
    }
  }, [sub]);

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <h2 className={`${classes.subTitle} upper`}>{sub.nameEn}</h2>
      </div>
      <div className={classes.body}>
        {items.map((item) => {
          return <Card item={item} key={item._id} />;
        })}
      </div>
    </div>
  );
}

export default SubCategoryItems;

const Card = ({ item }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setCategories } = useCategory();

  const { setItem } = useSelectedItem();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const URI = "/categories-item/delete";
    const response = await axiosPrivate.delete(URI, {
      data: item,
    });
    if (response.status === 200) {
      const cats = await get("/categories");
      setCategories(cats);

      navigate(`/console`);
    }
  };

  const handleEdit = () => {
    setItem(item);
    navigate(`/console/edit/${item.name}`);
  };

  return (
    <div className={`${classes.card} bg-shadow-bottom`} key={item._id}>
      <div
        className={`${classes.cardPart} ${classes.image}`}
        style={{ backgroundImage: `url(${item.images[0]})` }}
      ></div>
      <div className={classes.cardPart}>
        <h2 className={`${classes.title} upper`}>{item.name}</h2>
        <p className={classes.description}>{item.description}</p>
        <div className={`${classes.info} `}>
          <span className="number capitalize">price: $ {item.price}</span>
          <div>
            <span className="number capitalize">
              quantity in stock: {item.quantity}{" "}
            </span>
            <span>{item.quantity > 1 ? item.unit + "s" : item.unit}</span>
          </div>
          <span className="number capitalize">
            {item.images.length === 0
              ? "no images"
              : item.images.length === 1
              ? item.images.length + " image"
              : item.images.length + " images"}
          </span>
        </div>
        <div className={classes.icons}>
          <FontAwesomeIcon
            icon={faPenSquare}
            className={classes.edit}
            onClick={handleEdit}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            className={classes.delete}
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
