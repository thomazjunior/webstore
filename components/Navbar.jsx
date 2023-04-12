import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Sidebar from "./Sidebar";
import image from "../assets/wineLogo.png";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import Image from "next/image";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const handleClick = (event) => {
    setTimeout(
      () => showCart == true && setShowCart((prevState) => !prevState),
      200
    );
  };

  return (
    <div id="outside" className="navbar-container" onClick={handleClick}>
      <div id="outside">
        <Link href={"/"}>
          <Box
            className="navbar-container-title"
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Image src={image} width={80} height={80} />
            <p className="logo" style={{ color: "#CDCDCD" }}>
              Universo dos Vinhos
            </p>
          </Box>
        </Link>

        <Sidebar />
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
