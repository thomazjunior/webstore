import React, { useState } from "react";
import { urlFor } from "../lib/client";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { client } from "../lib/client";
import { useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { FilterContext } from "../components/context/FiltersContext";
import { Box } from "@mui/system";
import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Layout } from "../layout/Layout";
import Image from "next/image";
import promoLogo from "../assets/promo.png";

const Home = ({ products, bannerData }) => {
  const filters = React.useContext(FilterContext);
  const [vinhosBranco, setVinhosBranco] = useState([]);
  const [vinhosTinto, setVinhosTinto] = useState([]);
  const [cadao, setCadao] = useState([]);
  const [azeite, setAzeite] = useState([]);
  const [outros, setOutros] = useState([]);
  const [vinhoPorto, setVinhoPorto] = useState([]);

  useEffect(() => {
    const fetchProductsByType = async (type, setState) => {
      try {
        const query = `*[_type == "product" && references(*[_type == "category" && name == "${type}"][0]._id)]`;
        const products = await client.fetch(query);
        setState(products?.sort((a, b) => a.order - b.order));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProductsByType("Branco", setVinhosBranco);
    fetchProductsByType("Tinto", setVinhosTinto);
    fetchProductsByType("Porto", setVinhoPorto);
    fetchProductsByType("Cadao", setCadao);
    fetchProductsByType("Outros", setOutros);
    fetchProductsByType("Azeite", setAzeite);
  }, []);

  return (
    <Box
      className="carouselwrapper"
      sx={{ width: 1, display: "block", minHeight: "70vh" }}
    >
      {vinhosTinto.length > 0 && (
        <CarouselContainer data={vinhosTinto} title="Vinho Tinto" />
      )}
      {vinhosBranco.length > 0 && (
        <CarouselContainer data={vinhosBranco} title="Vinho Branco" />
      )}
      {azeite.length > 0 && <CarouselContainer data={azeite} title="Azeite" />}
      {outros.length > 0 && <CarouselContainer data={outros} title="Outros" />}
      {vinhoPorto.length > 0 && (
        <CarouselContainer data={vinhoPorto} title="Vinho do Porto/Moscatel" />
      )}
    </Box>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

const Card = ({ product, key }) => {
  const { image, name, slug, price, newprice } = product;
  const { onAdd, setShowCart } = useStateContext();
  const [qty, setQty] = useState(1);

  const handleDecQty = (event) => {
    event.preventDefault();
    if (qty > 1) setQty(qty - 1);
  };

  const handleIncQty = (event) => {
    event.preventDefault();
    setQty(qty + 1);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (product) onAdd(product, qty);
  };

  return (
    <Link href={`/product/${slug.current}`} key={slug.current}>
      <li className="card">
        <Box sx={{ cursor: "pointer" }}>
          <div className="product_dashboard">
            <img
              className="cart-product-image"
              src={urlFor(image && image[0])?.toString()}
            />
          </div>
          <div
            style={{
              minHeight: 100,
              justifyItems: "stretch",
              justifyContent: "space-between",
            }}
          >
            <p className="product-name" style={{ fontSize: "20px" }}>
              {name}
            </p>
            {!newprice && (
              <p className="product-price" style={{ fontSize: "18px" }}>
                {price?.toFixed(2)}€
              </p>
            )}
            {newprice && (
              <p className="product-price" style={{ fontSize: "18px" }}>
                <s>{price.toFixed(2)}€ </s>
                <br />{" "}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image width={100} height={70} src={promoLogo} />
                  <b style={{ color: "red" }}>{newprice.toFixed(2)}€ !!!</b>
                </Box>
              </p>
            )}
          </div>
        </Box>
        <Box sx={{}}>
          <div className="quantity" style={{ display: "inline-flex" }}>
            <p className="quantity-desc" style={{ width: "200px" }}>
              <span className="minus" onClick={handleDecQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={handleIncQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              style={{
                padding: "4px 0px",
                border: "1px solid #f02d34",
                margin: "10px 10px 10px",
                fontSize: "18px",
                fontWeight: "500",
                backgroundColor: "white",
                color: "#f02d34",
                cursor: "pointer",
                width: "200px",
                transform: "scale(1, 1)",
                transition: "transform 0.5s ease",
              }}
              onClick={handleAdd}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </Box>
      </li>
    </Link>
  );
};

const CarouselContainer = (props) => {
  const [moveClass, setMoveClass] = useState("");
  const [carouselItems, setCarouselItems] = useState(props?.data);

  useEffect(() => {
    const lastElement = carouselItems.pop();
    carouselItems.unshift(lastElement);
  }, [])
  const name =
    props.title == "Vinhos Tinto"
      ? "carouselTinto"
      : props.title == "Vinhos Branco"
      ? "carouselBranco"
      : props.title == "Vinho do Porto/Moscatel"
      ? "carouselVinhoPorto"
      : props.title == "Outros"
      ? "carouselOutros"
      : "carouselAzeite";

  useEffect(() => {
    props.title == "Vinhos Branco" &&
      document.documentElement.style.setProperty(
        "--vinhosBranco",
        carouselItems?.length
      );

    props.title == "Vinho do Porto/Moscatel" &&
      document.documentElement.style.setProperty(
        "--vinhoPorto",
        carouselItems?.length
      );

    props.title == "Outros" &&
      document.documentElement.style.setProperty(
        "--outros",
        carouselItems?.length
      );

    props.title == "Vinhos Tinto" &&
      document.documentElement.style.setProperty(
        "--vinhosTinto",
        carouselItems?.length
      );

    props.title == "Cadão" &&
      document.documentElement.style.setProperty(
        "--cadao",
        carouselItems?.length
      );

    props.title == "Azeite" &&
      document.documentElement.style.setProperty(
        "--azeite",
        carouselItems?.length
      );
  }, [carouselItems]);

  const handleAnimationEnd = () => {
    if (moveClass === "prev") {
      shiftNext([...carouselItems]);
    } else if (moveClass === "next") {
      shiftPrev([...carouselItems]);
    }
    setMoveClass("");
  };

  const shiftPrev = (copy) => {
    alert("prev")
    let lastcard = copy.pop();
    copy.splice(0, 0, lastcard);
    setCarouselItems(copy);
  };

  const shiftNext = (copy) => {
    let firstcard = copy.shift();
    copy.splice(copy.length, 0, firstcard);
    setCarouselItems(copy);
  };

  return (
    <div className="carouselwrapper module-wrapper">
      <div className="ui">
        <button onClick={() => setMoveClass("next")} className="prev">
          <span className="material-icons">
            <ArrowBackIosNewIcon />
          </span>
        </button>
        <button onClick={() => setMoveClass("prev")} className="next">
          <span className="material-icons">
            <ArrowForwardIosIcon />
          </span>
        </button>
      </div>
      <h1
        style={{ textAlign: "center", fontFamily: "cursive", color: "#882713" }}
      >
        {props.title}
      </h1>
      <ul
        onAnimationEnd={handleAnimationEnd}
        className={`${moveClass} ${name}`}
      >
        {carouselItems?.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
