import React from "react";
import { Outlet } from "react-router";
import Menu from "../Menu";

function ConsoleSite() {
  return (
    <main className=" bg-primary">
      <aside className="bg-shadow  bg-secondary">
        <Menu />
      </aside>
      <section className="bg-shadow bg-secondary">
        <Outlet />
      </section>
    </main>
  );
}

export default ConsoleSite;
