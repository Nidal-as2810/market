import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Accordion.module.css";

const accordionOpenStyle = {
  height: 500,
};
const accordionCloseStyle = {
  height: 50,
};

function Accordion({ menu }) {
  const [accordion, setAccordion] = useState(accordionCloseStyle);

  const handleAccordionChange = () => {
    if (accordion.height === 50) {
      setAccordion(accordionOpenStyle);
    } else {
      setAccordion(accordionCloseStyle);
    }
  };

  return (
    <div className={`${classes.main} bg-shadow-bottom`} style={accordion}>
      <h2 className={`${classes.title} upper`} onClick={handleAccordionChange}>
        {menu.title}
      </h2>
      <ul className={`${classes.list}`}>
        {menu.links.map((link, index) => {
          return (
            <Link to={link.link} className={`${classes.listItem}`} key={index}>
              <span className={`capitalize ${classes.link}`}>{link.title}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Accordion;
