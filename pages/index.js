import React from 'react';
import Page from '../layouts/main';
import Canvas from '../components/canvas';

function Index() {
  return (
    <Page>
      <Canvas>
        {ctx => {
          // ...
        }}
      </Canvas>
    </Page>
  );
}

export default Index;
