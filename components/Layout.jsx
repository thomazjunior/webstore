import React from "react";
import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/system";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Box sx={{}}>
      <Box sx={{backgroundColor: 'red'}}>
        <Head>
          <title>Universo dos Vinhos</title>
        </Head>
        <header>
          <Navbar />
        </header>
      </Box>
      <Box>
        <main className="main-container">{children}</main>
      </Box>
      <Box>
        <footer>
          <Footer />
        </footer>
        </Box>
        </Box>
    </div>
  );
};

export default Layout;
