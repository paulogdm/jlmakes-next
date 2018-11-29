import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Canvas from '../components/Canvas';
import Particles from '../components/Particles';
import Vignette from '../components/Vignette';

function Index() {
  return (
    <MainLayout>
      <Vignette />
      <Canvas>
        {(ctx, dimensions) => (
          <Particles count={600} ctx={ctx} dimensions={dimensions} />
        )}
      </Canvas>
    </MainLayout>
  );
}

export default Index;
