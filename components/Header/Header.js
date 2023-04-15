import Link from "next/link";
import React from "react";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin, AiOutlineShopping } from "react-icons/ai";
import { DiCssdeck } from "react-icons/di";
import { useStateContext } from "../../context/StateContext";
import Cart from "../Cart";
import image from '../../assets/cadão_preto.png';


import {
  Container,
  Div1,
  Div2,
  Div3,
  NavLink,
  SocialIcons,
  Span,
} from "./HeaderStyles";
import Image from "next/image";
import { Typography } from "@mui/material";

const Header = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const handleClick = (event) => {
    setTimeout(
      () => showCart == true && setShowCart((prevState) => !prevState),
      200
    );
  };
  return (

    <Container onClick={handleClick}>
      <Div1>
        <Link href="/">
          <a style={{ display: "flex", alignItems: "center", color: "white" }}>
          <Image src={image} width={160} height={120} />
          </a>
        </Link>
      </Div1>
    
      <Div3>
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </Div3>
      {showCart && <Cart />}
    </Container>
  )
};

export default Header;
