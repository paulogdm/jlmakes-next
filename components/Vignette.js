import React from 'react';

const Vignette = () => (
  <>
    <div className="vignette" />
    <style jsx>
      {`
        .vignette {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 2;
          background: transparent;
          background: radial-gradient(transparent, 60%, #180818);
        }
      `}
    </style>
  </>
);

export default Vignette;
