import React, { useEffect, useState } from "react";
import classes from "./Carousel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import useItems from "../../context/useItems";
import useAxiosPrivate from "../../context/useAxiosPrivate";
import useTempOrder from "../../context/useTempOrder";
import useAuth from "../../context/useAuth";

function Carousel() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { setTempOrder } = useTempOrder();
  const { items } = useItems();
  const [showItems, setShowItems] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    function randomItemsList(itemsList) {
      let max = itemsList.length < 10 ? itemsList.length : 10;
      return [...itemsList]
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
        .slice(0, max);
    }
    setShowItems(randomItemsList(items));
  }, [items]);

  const length = items.length;
  const nextImage = () => {
    if (current >= length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  const previousImage = () => {
    if (current <= 0) setCurrent(length - 1);
    else setCurrent(current - 1);
  };

  const handleAddToCart = async () => {
    const URI = "/order/item";
    const order = {
      username: auth.username,
      items: [
        {
          name: current.name,
          description: current.description,
          price: current.price,
          quantity: current.quantity,
          unit: current.unit,
          images: current.images,
          _id: current._id,
          orderQTY: 1,
          categoryId: current.categoryId,
          subId: current.subId,
        },
      ],
    };

    const orderResponse = await axiosPrivate.post(URI, order);
    if (orderResponse.status === 200) {
      const currentOpenOrder = await axiosPrivate.get(
        `/order/${auth.username}`
      );
      setTempOrder(currentOpenOrder);
    } else {
      console.log(orderResponse);
    }
  };

  return (
    <div className={`${classes.carousel} bg-shadow`}>
      <FontAwesomeIcon
        icon={faArrowAltCircleLeft}
        className={`${classes.arrow} ${classes.arrowLeft}`}
        onClick={nextImage}
      />
      <FontAwesomeIcon
        icon={faArrowAltCircleRight}
        className={`${classes.arrow} ${classes.arrowRight}`}
        onClick={previousImage}
      />
      {showItems.map((item, index) => {
        if (index !== current) {
          return "";
        }
        return (
          <div className={classes.carouselItem} key={item._id}>
            <img
              src={item.images[0]}
              alt={item.name}
              className={classes.carouselImage}
            />
            <div className={classes.itemInfo}>
              <h2 className={`${classes.title} upper `}>{item.name}</h2>
              <p className={`capitalize ${classes.description}`}>
                {item.description}
              </p>
              <div className={`capitalize ${classes.quantity}`}>
                quantity in stock:{" "}
                <span className="number">
                  {item.quantity}{" "}
                  {item.quantity === 1 ? item.unit : item.unit + "s"}
                </span>
              </div>
              <div className={`capitalize ${classes.quantity}`}>
                Only For:{" "}
                <span className="number">
                  {item.price}
                  {" $"}
                </span>
              </div>
              <button
                className={`upper ${classes.button}`}
                onClick={handleAddToCart}
              >
                buy now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Carousel;
