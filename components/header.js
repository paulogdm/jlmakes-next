import React from 'react';
import Head from 'next/head';

const Header = () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>
      {`
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          box-sizing: border-box;
        }

        *,
        *::before,
        *::after {
          position: relative;
          box-sizing: inherit;
        }
      `}
    </style>
  </>
);

export default Header;
