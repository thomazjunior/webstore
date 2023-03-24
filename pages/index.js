import React, { useState } from "react";
import { urlFor } from "../lib/client";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { client } from "../lib/client";
import { useEffect } from "react";
import { useStateContext } from '../context/StateContext'
import {
  FilterContext,
} from "../components/context/FiltersContext";
import { Box } from "@mui/system";
import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Home = ({ products, bannerData }) => {
  const filters = React.useContext(FilterContext);
  const [currentProducts, setCurrentProducts] = useState(products);
  const [vinhosBranco, setVinhosBranco] = useState();
  const [vinhosTinto, setVinhosTinto] = useState();
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
    <Box sx={{width: 1}}>
      {vinhosTinto && <CarouselContainer data={vinhosTinto} title={"Vinhos Tinto"}/>}

      {vinhosBranco && <CarouselContainer data={vinhosBranco} title={"Vinhos Branco"}/>}

      {azeite && <CarouselContainerAzeite data={azeite} title={"Azeites"}/>}
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
    <Link href={`/product/${slug.current}`}>
       <Box sx={{display: 'block', justifyContent: 'space-between'}}>
      <li className="card">
        <Box sx={{minHeight: 210}}>
        <img
          src={urlFor(image && image[0])}
          width={100}
          height={100}
          className="product-image"
        />
        <p className="product-name">{name}</p>
          <p className="product-price">{price.toFixed(2)}€</p>
        </Box>
        <Box>
        <div className="buttons">
            <button type="button" className="buy-now" onClick={() => null}>Comprar</button>
          </div>
          </Box>
        </li>
        </Box>
    </Link>
  );
};

const CarouselContainer = (props) => {
  const [moveClass, setMoveClass] = useState("");
  const [carouselItems, setCarouselItems] = useState(props?.data);

  console.log(carouselItems.length)

  useEffect(() => {
    document.documentElement.style.setProperty("--num", carouselItems.length);
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
          <span className="material-icons"><ArrowBackIosNewIcon/></span>
        </button>
        <button onClick={() => setMoveClass("prev")} className="next">
          <span className="material-icons"><ArrowForwardIosIcon/></span>
        </button>
      </div>
      <h1>{props.title}</h1>
      <ul
        onAnimationEnd={handleAnimationEnd}
        className={`${moveClass} carousel`}
      >
        {carouselItems.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </ul>
    </div>
  );
};

const CarouselContainerAzeite = (props) => {
  const [carouselItems, setCarouselItems] = useState(props?.data);



  return (
    <>
    
<h1>{props.title}</h1>
    <Box sx={{ml: 50, backgroundColor: "#fff"}} >
      <ul
        className={`carouselAzeite`}
      >
        
        {carouselItems.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </ul>
    </Box>
    </>
  );
};

export default Home;
