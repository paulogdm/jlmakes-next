import React from 'react';
import Header from '../components/Header';

function MainLayout({children}) {
  return (
    <>
      <Wrapper>
        <Header />
        <Main>{children}</Main>
        <Footer>...</Footer>
      </Wrapper>
    </>
  );
}

function Wrapper({children}) {
  return (
    <>
      <div>{children}</div>
      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: column;
            height: 100vh;
          }
        `}
      </style>
    </>
  );
}

function Main({children}) {
  return (
    <>
      <main>{children}</main>
      <style jsx>
        {`
          main {
            flex: 1 0 auto;
          }
        `}
      </style>
    </>
  );
}

function Footer({children}) {
  return (
    <>
      <footer>{children}</footer>
      <style jsx>
        {`
          footer {
            flex-shrink: 0;
            height: 320px;
            background: #030108;
            border-top: 1px solid #241226;
          }
        `}
      </style>
    </>
  );
}

export default MainLayout;
