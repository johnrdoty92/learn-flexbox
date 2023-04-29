import { Container } from './components/Layout/Container';
import { DevControls } from './components/DevControls';
import { useBlockContext } from 'contexts/BlockContext';
import classes from './css/App.module.css';
import { useEffect, useRef } from 'react';
import { animated, useSprings } from '@react-spring/web';

const BLOCK_COUNT = 3;

function App() {
  const dataBlockContainerRef = useRef<HTMLDivElement>(null);
  const { state } = useBlockContext();
  const [springs, api] = useSprings(BLOCK_COUNT, () => {
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  });

  useEffect(() => {
    if (!dataBlockContainerRef.current) return;
    dataBlockContainerRef.current.childNodes.forEach((child, i) => {
      if (!(child instanceof HTMLElement)) return;
      api.start((index) => {
        if (index !== i) return false;
        return {
          x: child.offsetLeft,
          y: child.offsetTop,
        };
      });
    });
  }, [state]);

  return (
    <Container>
      <DevControls />
      {springs.map((props, i) => {
        return (
          <animated.div
            className={classes.visibleBlock}
            key={`visibleBlock-${i}`}
            style={{ ...props }}
          />
        );
      })}
      <div
        ref={dataBlockContainerRef}
        className={classes.blockContainer}
        style={{ ...state.parent }}
      >
        {Array(BLOCK_COUNT)
          .fill(<></>)
          .map((_, i) => (
            <div key={`dataBlock-${i}`} className={classes.dataBlock} />
          ))}
      </div>
    </Container>
  );
}

export default App;
