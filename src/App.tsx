import { Container } from './components/Layout/Container';
import { DevControls } from './components/DevControls';
import { GameControls } from 'components/GameControls';
import { GameWindow } from 'components/GameWindow';

function App() {
  return (
    <Container>
      <DevControls />
      <GameWindow />
      <GameControls />
    </Container>
  );
}

export default App;
