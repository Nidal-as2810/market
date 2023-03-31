import axios from "./axios";

export const create = async (url, data) => {
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const get = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
