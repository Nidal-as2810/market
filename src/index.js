import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthProvider";
import { CategoryProvider } from "./context/CategoryContext";
import { SelectedSubProvider } from "./context/SelectedSubContext";
import { ItemsProvider } from "./context/ItemsContext";
import { SubsProvider } from "./context/SubsContext";
import { TempOrderProvider } from "./context/TempOrderProvider";
import { SelectedItemProvider } from "./context/SelectedItemContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CategoryProvider>
      <SelectedSubProvider>
        <SubsProvider>
          <ItemsProvider>
            <AuthProvider>
              <TempOrderProvider>
                <SelectedItemProvider>
                  <App />
                </SelectedItemProvider>
              </TempOrderProvider>
            </AuthProvider>
          </ItemsProvider>
        </SubsProvider>
      </SelectedSubProvider>
    </CategoryProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
