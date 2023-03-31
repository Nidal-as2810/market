import React from "react";
import classes from "./SubCategoryCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../context/useAxiosPrivate";
import useTempOrder from "../../context/useTempOrder";
import useAuth from "../../context/useAuth";

export default function MainPageCards({ item, index }) {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { setTempOrder } = useTempOrder();

  const handleAddToCart = async () => {
    const URI = "/order/item";
    const order = {
      username: auth.username,
      items: [
        {
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity,
          unit: item.unit,
          images: item.images,
          _id: item._id,
          orderQTY: 1,
          categoryId: item.categoryId,
          subId: item.subId,
        },
      ],
    };

    const orderResponse = await axiosPrivate.post(URI, order);
    if (orderResponse.status === 200) {
      const currentOpenOrder = await axiosPrivate.get(
        `/order/${auth.username}`
      );
      console.log(currentOpenOrder);
      setTempOrder(currentOpenOrder.data);
    } else {
      console.log(orderResponse);
    }
  };

  return (
    <div
      className={`${
        index % 2 === 0 ? classes.item : classes.itemReverse
      } bg-shadow`}
    >
      <img
        src={[...item.images]
          .sort(() => (Math.random() > 0.5 ? 1 : -1))
          .slice(0, 1)}
        alt={item.name}
        className={classes.imageContainer}
      />
      <div className={classes.info}>
        <h2 className={`${classes.title} upper`}>{item.name}</h2>
        <p className={`${classes.description} capitalize`}>
          {item.description}
        </p>
        <div className={classes.container}>
          <span className={`${classes.numbers} capitalize`}>
            price: $<span className="number">{item.price}</span>
          </span>
          <span className={`${classes.numbers} capitalize`}>
            stock: <span className="number">{item.quantity}</span>{" "}
            {item.quantity === 1 ? item.unit : item.unit + "s"}
          </span>
        </div>
        <button
          className={`${classes.button} ${
            index % 2 === 0 ? classes.buy : classes.buyReverse
          }`}
          onClick={handleAddToCart}
        >
          <span>buy now</span> <FontAwesomeIcon icon={faCartPlus} />{" "}
        </button>
        {/* <button
          className={`${classes.button} ${
            index % 2 === 0 ? classes.fav : classes.favReverse
          }`}
        >
          <span>add to favourites</span> <FontAwesomeIcon icon={faHeart} />{" "}
        </button> */}
      </div>
    </div>
  );
}
