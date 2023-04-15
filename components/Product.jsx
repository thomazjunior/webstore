import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';


// const Product = ({ product: { image, name, slug, price } }) => {
  const Product = ({ product }) => {
    if (!product) return null;
  
    const { image, name, slug, price } = product;

  return (
      <Link href={`/product/${slug.current}`}>
        <div className="card" style={{ minWidth: '350px', backgroundColor: 'white'}}>
          <img
            src={urlFor(image && image[0])}
          className="product-image"
          style={{margin: '100px !important'}}
          />
          <p className="product-name">{name}</p>
          <p className="product-price">{price.toFixed(2)}€</p>
          </div>
      </Link>
  )
}

export default Product