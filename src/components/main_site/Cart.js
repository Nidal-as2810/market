import React, { useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { format } from "date-fns";
import useAuth from "../../context/useAuth";
import useAxiosPrivate from "../../context/useAxiosPrivate";
import useTempOrder from "../../context/useTempOrder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faLock,
  faCartArrowDown,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

function Cart() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({});

  const username = auth.username;
  useEffect(() => {
    const getOrders = async () => {
      const response = await axiosPrivate.get("/order/all/" + username);
      let data = [];
      if (response.status === 200) data = response.data;
      setOrders(data);
    };

    getOrders();
  }, [axiosPrivate, username]);

  return (
    <div className={`${classes.cart} bg-shadow`}>
      <div className={classes.nav}>
        {orders.map((order, index) => {
          return (
            <NavItem
              order={order}
              index={index}
              setCurrentOrder={setCurrentOrder}
              setOrders={setOrders}
            />
          );
        })}
      </div>
      <div className={classes.main}>
        {currentOrder.items?.length
          ? currentOrder.items.map((item) => {
              return (
                <OrderItems
                  order={currentOrder}
                  item={item}
                  setOrders={setOrders}
                  setCurrentOrder={setCurrentOrder}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Cart;

const NavItem = ({ order, index, setCurrentOrder, setOrders }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { setTempOrder } = useTempOrder();
  const handleSelectOrder = () => {
    setCurrentOrder(order);
    console.log(order);
  };

  const handleDeleteOrder = async () => {
    if (!order.temp) return;

    const deleteResponse = await axiosPrivate.delete("/order", {
      data: { orderId: order._id, username: order.username },
    });
    if (deleteResponse.status === 200) {
      const response = await axiosPrivate.get("/order/all/" + order.username);
      let data = [];
      if (response.status === 200) data = response.data;
      setOrders(data);
      setCurrentOrder({});
      setTempOrder({});
    }
  };

  const handleCheckOut = () => {
    navigate("/checkout");
  };
  return (
    <div
      className={`${classes.navItem} ${index % 2 > 0 ? classes.bgGrey : ""}`}
      onClick={handleSelectOrder}
    >
      <div className={classes.header}>
        <h2 className={`number ${classes.title}`}>
          {format(new Date(order.date), "dd/MM/yyyy")}
        </h2>
        <h2 className={`number capitalize ${classes.title}`}>
          total: ${new Intl.NumberFormat().format(order.total)}
        </h2>
      </div>
      <div className={`${classes.info} bg-shadow`}>
        <span className={`number capitalize`}>
          total unique items: {order.totalDifferentItems}
        </span>
        <span className={`number capitalize`}>
          total items: {order.totalItems}
        </span>

        {order.temp ? (
          <>
            <FontAwesomeIcon
              icon={faTrashAlt}
              className={classes.delete}
              onClick={handleDeleteOrder}
            />
            <FontAwesomeIcon
              icon={faCartArrowDown}
              className={classes.pay}
              onClick={handleCheckOut}
            />
          </>
        ) : (
          <FontAwesomeIcon icon={faLock} className={classes.lock} />
        )}
      </div>
    </div>
  );
};

const OrderItems = ({ order, item, setOrders, setCurrentOrder }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setTempOrder } = useTempOrder();
  const [qty, setQty] = useState(item.orderQTY);
  const [dispayImage, setDisplayImage] = useState(
    item.images[0] ||
      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
  );

  const handleShowImage = (image) => {
    setDisplayImage(image);
  };

  const handleUpdateItem = async () => {
    const updatedItem = {
      orderId: order._id,
      username: order.username,
      item: {
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        unit: item.unit,
        images: item.images,
        _id: item._id,
        orderQTY: qty,
      },
    };
    if (!order.temp) return;
    const updateResponse = await axiosPrivate.patch("/order/item", updatedItem);
    if (updateResponse.status === 200) {
      const response = await axiosPrivate.get("/order/all/" + order.username);
      let data = [];
      if (response.status === 200) data = response.data;
      setOrders(data);

      const tempOrder = await axiosPrivate.get("/order/" + order.username);
      if (tempOrder.status === 200) {
        setTempOrder(tempOrder.data);
      }
    }
  };

  const handleDeletItem = async () => {
    const updatedItem = {
      orderId: order._id,
      username: order.username,
      item: {
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        unit: item.unit,
        images: item.images,
        _id: item._id,
        orderQTY: qty,
      },
    };
    if (!order.temp) return;

    let deleteResponse;
    if (order.totalDifferentItems > 1) {
      deleteResponse = await axiosPrivate.delete("/order/item", {
        data: updatedItem,
      });
    } else {
      deleteResponse = await axiosPrivate.delete("/order", {
        data: updatedItem,
      });
    }

    if (deleteResponse.status === 200) {
      const response = await axiosPrivate.get("/order/all/" + order.username);
      let data = [];
      if (response.status === 200) data = response.data;
      setOrders(data);
      setCurrentOrder({});
    }
  };
  return (
    <div className={`${classes.item} bg-shadow`}>
      <img src={dispayImage} alt={item.name} className={classes.itemImage} />
      <ul className={classes.imageList}>
        {item.images.map((image) => {
          return (
            <li
              key={image}
              className={classes.imageIcon}
              onClick={() => handleShowImage(image)}
            ></li>
          );
        })}
      </ul>
      <div className={classes.itemInfo}>
        <h2>{item.name}</h2>
        <span>price: ${item.price}</span>
        <span className={classes.qyt}>
          quantity:
          {order.temp ? (
            <input
              className={`${classes.input}`}
              type="number"
              value={qty}
              onChange={(e) => {
                setQty(e.target.value);
              }}
            />
          ) : (
            <span> {` ${qty}`}</span>
          )}
        </span>
        <span>total: ${new Intl.NumberFormat().format(qty * item.price)}</span>
        {order.temp ? (
          <div className={classes.icons}>
            <FontAwesomeIcon
              icon={faSave}
              className={classes.iconEdit}
              onClick={handleUpdateItem}
            />
            <FontAwesomeIcon
              icon={faTrashAlt}
              className={classes.iconDelete}
              onClick={handleDeletItem}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
