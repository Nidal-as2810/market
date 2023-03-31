import React, { useEffect, useState } from "react";

import Carousel from "./Carousel";
import SubCategoryCard from "./SubCategoryCard";

function MainPage() {
  return (
    <div className="main">
      <Carousel />
      <SubCategoryCard />
    </div>
  );
}

export default MainPage;
