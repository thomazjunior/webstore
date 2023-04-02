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
    <Box sx={{ width: 1, display: "block" }}>
      {vinhosTinto && (
        <CarouselContainer data={vinhosTinto} title={"Vinhos Tinto"} />
      )}
      {vinhosBranco && (
        <CarouselContainer data={vinhosBranco} title={"Vinhos Branco"} />
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

const Card = ({ product }) => {
  const { image, name, slug, price } = product;
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  return (
    <Link href={`/product/${slug.current}`} >
      <li className="card" >
        <Box sx={{
          display: 'block',
          
        }}>
          <Box sx={{
            height: "260px", 
          }}>
            <img
              src={urlFor(image && image[0])}
              className="product-image"
            />
            <div style={{minHeight: 100, justifyItems: "stretch", justifyContent: 'space-between' }}>
            <p className="product-name">{name}</p>
              <p className="product-price">{price.toFixed(2)}€</p>
              </div>
          </Box>
          <Box sx={{}}>
            <div className="buttons">
              <button type="button" className="buy-now" onClick={() => null}>
                Comprar
              </button>
            </div>
          </Box>
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
    <div className="carouselwrapper module-wrapper" >
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
      <h1 style={{textAlign: 'center', fontFamily: "cursive", color: '#882713' }}>{props.title}</h1>
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
