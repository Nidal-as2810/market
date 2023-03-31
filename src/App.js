import React, { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import PersistLogin from "./components/register/PersistLogin";
import AuthorizationProvider from "./context/AuthorizationProvider";
import useCategory from "./context/useCategory";
import useSubs from "./context/useSubs";
import useItems from "./context/useItems";

import ConsoleSite from "./components/layouts/ConsoleSite";
import MainSite from "./components/layouts/MainSite";

import AddCategory from "./components/body/store/AddCategory";
import Categories from "./components/body/store/Categories";
import AddSubCategory from "./components/body/store/AddSubCategory";
import AddItem from "./components/body/store/AddItem";
import SubCategoryItems from "./components/body/store/SubCategoryItems";
import EditItem from "./components/body/store/EditItem";
import Cart from "./components/main_site/Cart";
import CheckOut from "./components/main_site/CheckOut";

import Signup from "./components/register/Signup";
import Signin from "./components/register/Signin";
import MainPage from "./components/main_site/MainPage";
import CategoryItems from "./components/main_site/CategoryItems";

import { get } from "./api/crud";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<PersistLogin />}>
        <Route path="" element={<MainSite />}>
          <Route path="" element={<MainPage />} />
          <Route path="login" element={<Signin />} />
          <Route path="register" element={<Signup />} />
          <Route path="category/*" element={<CategoryItems />} />
          <Route element={<AuthorizationProvider allowedRoles={[3000]} />}>
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckOut />} />
          </Route>
        </Route>

        <Route element={<AuthorizationProvider allowedRoles={[1000, 2000]} />}>
          <Route path="console" element={<ConsoleSite />}>
            <Route path="categories" element={<Categories />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="add-subCategory" element={<AddSubCategory />} />
            <Route path="add-item" element={<AddItem />} />
            <Route path="sub/*" element={<SubCategoryItems />} />
            <Route path="edit/*" element={<EditItem />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
function App() {
  const { setCategories } = useCategory();
  const { setSubs } = useSubs();
  const { setItems } = useItems();

  useEffect(() => {
    async function fetchData() {
      let cats = await get("/categories");
      setCategories(cats);

      let subsList = [];
      let itemList = [];
      cats.forEach((category) => {
        let subs = category.subs;
        subsList = [...subsList, ...subs];
        subs.forEach((sub) => {
          if (sub.items.length) itemList = [...itemList, ...sub.items];
        });
      });

      setSubs(subsList);
      setItems(itemList);
    }
    fetchData();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
