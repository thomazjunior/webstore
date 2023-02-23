import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Universo dos Vinhos</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
      <Sidebar />
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout