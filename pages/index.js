import React from 'react';
import Page from '../layouts/main';
import Canvas from '../components/canvas';
import Particles from '../components/particles';

function Index() {
  return (
    <Page>
      <Canvas>
        {(ctx, dimensions) => (
          <Particles count={50} ctx={ctx} dimensions={dimensions} />
        )}
      </Canvas>
    </Page>
  );
}

export default Index;
