import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import '../styles/Home.css'
import { StateContext } from '../context/StateContext';
import { FilterProvider } from '../components/context/FiltersContext';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <FilterProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
      </FilterProvider>

    </StateContext>
  )
}

export default MyApp
