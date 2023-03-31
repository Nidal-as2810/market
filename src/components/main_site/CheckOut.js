import React, { useState } from "react";
import classes from "./CheckOut.module.css";
import useTempOrder from "../../context/useTempOrder";
import useAuth from "../../context/useAuth";
import useAxiosPrivate from "../../context/useAxiosPrivate";
import { format } from "date-fns";
import { useNavigate } from "react-router";

function CheckOut() {
  const navigate = useNavigate();
  const { tempOrder, setTempOrder } = useTempOrder();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState("");
  const [name, setName] = useState(tempOrder.username);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const handleCheckOut = async () => {
    if (!name || !address || !city || !country || !phone) {
      setMessage("all fields are required!");
      return;
    }

    if (tempOrder.username !== auth.username) {
      setMessage("this order doesn't belong to you.");
      return;
    }
    const order = {
      orderId: tempOrder._id,
      username: tempOrder.username,
      info: {
        name,
        address,
        city,
        country,
        phone,
      },
    };

    const response = await axiosPrivate.patch("/order", order);
    if (response.status === 200) {
      setTempOrder({});
      navigate("/");
    } else {
      setMessage(response.message);
    }
  };

  return (
    <div className={`bg-shadow ${classes.main}`}>
      <div className={classes.order}>
        <h2 className="number">
          {format(new Date(tempOrder.date), "dd/MM/yyyy")}
        </h2>
        <h2 className="number">
          Total: {new Intl.NumberFormat().format(tempOrder.total)}
        </h2>
        <h2 className="number">
          Total Items: {new Intl.NumberFormat().format(tempOrder.totalItems)}
        </h2>
        <h2 className="number">
          Total Unique Items:{" "}
          {new Intl.NumberFormat().format(tempOrder.totalDifferentItems)}
        </h2>
        <button
          className={`bg-shadow ${classes.button}`}
          onClick={handleCheckOut}
        >
          Check out
        </button>
      </div>
      <div className={classes.info}>
        <div className={classes.infoItem}>
          <label htmlFor="name" className={classes.label}>
            name
          </label>
          <input
            type="text"
            id="name"
            className={classes.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes.infoItem}>
          <label htmlFor="address" className={classes.label}>
            address
          </label>
          <input
            type="text"
            id="address"
            className={classes.input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={classes.infoItem}>
          <label htmlFor="city" className={classes.label}>
            city
          </label>
          <input
            type="text"
            id="city"
            className={classes.input}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className={classes.infoItem}>
          <label htmlFor="country" className={classes.label}>
            country
          </label>
          <input
            type="text"
            id="country"
            className={classes.input}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className={classes.infoItem}>
          <label htmlFor="phone" className={classes.label}>
            phone
          </label>
          <input
            type="tel"
            id="phone"
            className={classes.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={classes.messageInfo}>
          <p className={classes.message}>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
