import { Container } from './components/Layout/Container';
import { DevControls } from './components/DevControls';
import { GameControls } from 'components/GameControls';
import { GameWindow } from 'components/GameWindow';
import { useRef } from 'react';
import { Canvas } from 'components/Canvas/Canvas';

function App() {
  const gameWindowRef = useRef<HTMLDivElement>(null);
  return (
    <Container>
      <DevControls />
      <Canvas gameWindowRef={gameWindowRef} />
      <GameWindow gameWindowRef={gameWindowRef} />
      <GameControls />
    </Container>
  );
}

export default App;
