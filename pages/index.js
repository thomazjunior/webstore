import React, { useState } from 'react';
import {
  InputBase,
} from '@mui/material';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';
import { useContext, useEffect } from 'react';
import Search from '../components/Search'
import { FilterContext, FilterDispatchContext } from '../components/context/FiltersContext';

const Home = ({ products, bannerData }) => {
  const filters = React.useContext(FilterContext);
  const [name, setName] = useState(filters.filterName);
  const [currentProducts, setCurrentProducts] = useState(products);


  useEffect(() => {
    setCurrentProducts(() => products)
  }, [products])

  useEffect(() => {
    console.log("...........")
    setName(filters.filterName)
  }, [filters.filterName])
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        let gQuery = '*[_type == "product"';
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

        if (name) {
          gQuery += ` && name match "${name}*"`;
        }

        gQuery+=`]`;
       const newproducts = await client.fetch(gQuery);
       setCurrentProducts(() => newproducts);
      } catch (err) {
       
      }
    };

    fetchData();
  }, [name]);

  function handleChange(name) {
    setName(() => name)
  }
  
  return (

  <div>
  
    <div className="products-heading">
    </div>
    <div className="products-container">
      {currentProducts?.map((product) => <Product key={product._id} product={product} />)}
    </div>


  </div>
)};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;
