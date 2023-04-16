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

const Home = ({ products, bannerData }) => {
  const filters = React.useContext(FilterContext);
  const [currentProducts, setCurrentProducts] = useState(products);
  const [vinhosBranco, setVinhosBranco] = useState();
  const [vinhosTinto, setVinhosTinto] = useState();
  const [cadao, setCadao] = useState();
  const [azeite, setAzeite] = useState();

  useEffect(() => {
    const fetchVinhosBranco = async () => {
      const type = "branco";
      try {
        let gQuery = `*[_type == "product" && name match "${type}*"]`;

        const vinhosBranco = await client.fetch(gQuery);
        setVinhosBranco(() => vinhosBranco);

        /**   if (category !== 'all') {
          gQuery += ` && category match "${category}" `;
        }
        if (query !== 'all') {
          gQuery += ` && name match "${query}" `;
        }
        if (price !== 'all') {
          const minPrice = Number(price.split('-')[0]);
          const maxPrice = Number(price.split('-')[1]);
          gQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`;
        }
        if (rating !== 'all') {
          gQuery += ` && rating >= ${Number(rating)} `;
        }
        let order = '';
        if (sort !== 'default') {
          if (sort === 'lowest') order = '| order(price asc)';
          if (sort === 'highest') order = '| order(price desc)';
          if (sort === 'toprated') order = '| order(rating desc)';
        } */
      } catch (err) {}
    };

    fetchVinhosBranco();
  }, []);

  useEffect(() => {
    const fetchVinhosTinto = async () => {
      const type = "tinto";
      try {
        let gQuery = `*[_type == "product" && name match "${type}*"]`;

        const vinhosTinto = await client.fetch(gQuery);
        setVinhosTinto(() => vinhosTinto);
      } catch (err) {}
    };
    fetchVinhosTinto();
  }, []);

  useEffect(() => {
    const fetchCadao = async () => {
      const type = "cadão";
      try {
        let gQuery = `*[_type == "product" && name match "${type}*"]`;

        const cadao = await client.fetch(gQuery);
        setCadao(() => cadao);
      } catch (err) {}
    };
    fetchCadao();
  }, []);

  useEffect(() => {
    const fetchAzeite = async () => {
      const type = "azeite";
      try {
        let gQuery = `*[_type == "product" && name match "${type}*"]`;

        const azeite = await client.fetch(gQuery);
        setAzeite(() => azeite);
      } catch (err) {}
    };
    fetchAzeite();
  }, []);

  return (
    <Box className={'carouselwrapper'} sx={{ width: 1, display: "block", minHeight: '70vh' }}>
      {vinhosTinto && (
        <CarouselContainer data={vinhosTinto} title={"Vinho Tinto"} />
      )}
      {vinhosBranco && (
        <CarouselContainer data={vinhosBranco} title={"Vinho Branco"} />
      )}
      {cadao && <CarouselContainer data={cadao} title={"Cadão"} />}
      {azeite && <CarouselContainer data={azeite} title={"Azeite"} />}
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
  const { image, name, slug, price } = product;
  const { onAdd, setShowCart } = useStateContext();
  const [qty, setQty] = useState(1);

  const handleDecQty = (event) => { 
    event.preventDefault();
    if (qty > 1)
    setQty(qty - 1);
  }

  const handleIncQty = (event) => { 
    event.preventDefault();
    setQty(qty + 1);
  }

  const handleAdd = (event) => {
    console.log(product)
    event.preventDefault();
    if(product)
    onAdd(product, qty)
  }



  return (
    <Link href={`/product/${slug.current}`} key={slug.current}>
      <li className="card">
        <Box sx={{cursor: 'pointer'}}>
          <img
            height={100}
            width={100}
            src={urlFor(image && image[0])}
            className="product-image"
            style={{curso: "pointer !important"}}
          />
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
            <p className="product-price" style={{ fontSize: "22px" }}>
              {price.toFixed(2)}€
            </p>
          </div>
        </Box>
        <Box sx={{}}>
          <div className="quantity" style={{display: 'inline-flex'}}>
            <p className="quantity-desc" style={{width: '200px'}}> 
              <span
                className="minus"
                onClick={handleDecQty}
              >
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

  const name =
    props.title == "Vinhos Tinto"
      ? "carouselTinto"
      : props.title == "Vinhos Branco"
      ? "carouselBranco"
      : props.title == "Cadão"
      ? "carouselCadao"
      : "carouselAzeite";

  useEffect(() => {
    props.title == "Vinhos Branco" &&
      document.documentElement.style.setProperty(
        "--vinhosBranco",
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
