import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';


// const Product = ({ product: { image, name, slug, price } }) => {
  const Product = ({ product }) => {
    if (!product) return null;
  
    const { image, name, slug, price } = product;

  return (
      <Link href={`/product/${slug.current}`}>
        <div>
          <img 
            src={urlFor(image && image[0])}
            width={225}
            height={225}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">{price.toFixed(2)}€</p>
          </div>
      </Link>
  )
}

export default Product