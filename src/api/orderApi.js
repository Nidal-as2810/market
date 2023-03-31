import { axiosPrivate } from "./axios";

export const getTempOrder = async (user, token) => {
  try {
    const response = await axiosPrivate.get("/order/" + user, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getUserAllOrders = async (user, token) => {
  try {
    const response = await axiosPrivate.get("/order/all/" + user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const addItemToOrder = async (data, token) => {
  try {
    const response = await axiosPrivate.post("/order/item", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
