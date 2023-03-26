import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Sidebar from "./Sidebar";
import image from "../assets/wineLogo.png"

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import Image from "next/image";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <Link href={'/'}>
      <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
        <Image src={image} width={100} height={100} />
        <p className='logo' style={{color: '#CDCDCD', fontSize: '38px'}}>Universo dos Vinhos</p>
        </Box>
        </Link>
      

      <div className="navebar-browser">
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
