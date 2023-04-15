import React from 'react';
import { Toaster } from 'react-hot-toast';
import Theme from '../styles/theme';

import Layout from '../layout/Layout'
import '../styles/globals.css';
import '../styles/Home.css'
import { StateContext } from '../context/StateContext';
import { FilterProvider } from '../components/context/FiltersContext';

function App({ Component, pageProps }) {
  return (
    <Theme>
      <StateContext>
      <Layout>
      <FilterProvider>
        <Toaster />
        <Component {...pageProps} />
      </FilterProvider>
      </Layout>
      </StateContext>
      </Theme>
  )
}

export default App
