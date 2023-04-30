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
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
      width: '0%',
      height: '0%',
    };
  });

  useEffect(() => {
    if (!dataBlockContainerRef.current) return;
    const updatePositions = () => {
      if (!dataBlockContainerRef.current) return;
      let stretchedProps = { width: '0%', height: '0%' };
      if (
        state.parent.alignItems === 'stretch' ||
        state.parent.alignItems === 'normal'
      ) {
        if (state.parent.flexDirection.includes('column')) {
          stretchedProps = { width: '100%', height: '0%' };
        } else if (state.parent.flexDirection.includes('row')) {
          stretchedProps = { width: '0%', height: '100%' };
        }
      }
      dataBlockContainerRef.current.childNodes.forEach((child, i) => {
        if (!(child instanceof HTMLElement)) return;
        if (child.className === classes.visibleBlock) return;
        api.start((index) => {
          if (index !== i) return false;
          return {
            left: child.offsetLeft,
            top: child.offsetTop,
            ...stretchedProps,
          };
        });
      });
    };
    updatePositions();
    const resizeObserver = new ResizeObserver(() => updatePositions());
    resizeObserver.observe(dataBlockContainerRef.current);
    return () => resizeObserver.disconnect();
  }, [state]);

  return (
    <Container>
      <DevControls />
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
        {springs.map((props, i) => {
          return (
            <animated.div
              className={classes.visibleBlock}
              key={`visibleBlock-${i}`}
              style={{
                ...props,
                backgroundColor: `rgb(20, ${
                  255 - i * (255 / BLOCK_COUNT)
                }, 120)`,
              }}
            />
          );
        })}
      </div>
    </Container>
  );
}

export default App;
