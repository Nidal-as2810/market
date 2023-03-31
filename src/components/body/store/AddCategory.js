import React, { useEffect, useState } from "react";
import classes from "./AddCategory.module.css";
import { get } from "../../../api/crud";
import useAxiosPrivate from "../../../context/useAxiosPrivate";
import useCategory from "../../../context/useCategory";

const CATEGORY_URL = "/categories-private";

function AddCategory() {
  const axiosPrivate = useAxiosPrivate();

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [nameHe, setNameHe] = useState("");
  const [message, setMessage] = useState("");
  const [messageٍStyle, setMessageStyle] = useState({ color: "green" });
  const { setCategories } = useCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = {
      nameAr,
      nameEn: nameEn.toLowerCase(),
      nameHe,
    };

    console.log(category);
    const res = await axiosPrivate.post(CATEGORY_URL, category);
    if (res.status === 200) {
      setNameEn("");
      setNameAr("");
      setNameHe("");
      setMessage(res.message);
      setMessageStyle({ color: "green" });
      let cats = await get("/categories");
      setCategories(cats);
    } else {
      setMessage(res.message);
      setMessageStyle({ color: "red" });
    }
  };

  useEffect(() => {
    if (nameEn) {
      setMessage("");
    }
  }, [nameEn]);

  return (
    <div className={classes.main}>
      <div className={`${classes.header} bg-shadow-bottom`}>
        <h2 className={`capitalize ${classes.title}`}>add new category</h2>
      </div>
      <div className={`${classes.body} bg-shadow-top`}>
        <form
          className={`${classes.form} bg-shadow-all`}
          onSubmit={handleSubmit}
        >
          <div className={classes.formItem}>
            <label htmlFor="nameEn">Name</label>
            <input
              id="nameEn"
              type="text"
              className={`${classes.input} en`}
              autoComplete="off"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
            />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="nameAe">Arabic Name</label>
            <input
              id="nameAr"
              type="text"
              className={`${classes.input} ar`}
              autoComplete="off"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
            />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="nameHe">Hebrew Name</label>
            <input
              id="nameHe"
              type="text"
              className={`${classes.input} ar`}
              autoComplete="off"
              value={nameHe}
              onChange={(e) => setNameHe(e.target.value)}
            />
          </div>
          <div className={classes.formItem}>
            <button className={`${classes.button} bg-shadow-bottom upper`}>
              save
            </button>
          </div>
          <p className={classes.message} style={messageٍStyle}>
            {message}
          </p>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
