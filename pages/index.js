import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Canvas from '../components/Canvas';
import Particles from '../components/Particles';

function Index() {
  return (
    <MainLayout>
      <Canvas>
        {(ctx, dimensions) => (
          <Particles count={600} ctx={ctx} dimensions={dimensions} />
        )}
      </Canvas>
    </MainLayout>
  );
}

export default Index;
