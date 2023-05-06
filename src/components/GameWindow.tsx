import { animated, useSprings } from '@react-spring/web';
import { useBlockContext } from 'contexts/BlockContext';
import { RefObject, useEffect } from 'react';
import classes from '../css/App.module.css';

export const GameWindow = ({
  gameWindowRef,
}: {
  gameWindowRef: RefObject<HTMLDivElement>;
}) => {
  const {
    state: { parent, objectCount },
  } = useBlockContext();
  const [springs, api] = useSprings(objectCount, () => {
    return {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
      width: '0%',
      height: '0%',
      opacity: 0,
    };
  });

  useEffect(() => {
    if (!gameWindowRef.current) return;
    const updatePositions = () => {
      if (!gameWindowRef.current) return;
      let stretchedProps = { width: '0%', height: '0%' };
      if (parent.alignItems === 'stretch' || parent.alignItems === 'normal') {
        if (parent.flexDirection.includes('column')) {
          stretchedProps = { width: '100%', height: '0%' };
        } else if (parent.flexDirection.includes('row')) {
          stretchedProps = { width: '0%', height: '100%' };
        }
      }
      gameWindowRef.current.childNodes.forEach((child, i) => {
        if (!(child instanceof HTMLElement)) return;
        if (child.className === classes.visibleBlock) return;
        api.start((index) => {
          if (index !== i) return false;
          return {
            left: child.offsetLeft,
            top: child.offsetTop,
            opacity: 1,
            ...stretchedProps,
          };
        });
      });
    };
    updatePositions();
    const resizeObserver = new ResizeObserver(() => updatePositions());
    resizeObserver.observe(gameWindowRef.current);
    return () => resizeObserver.disconnect();
  }, [parent, objectCount]);

  return (
    <div
      ref={gameWindowRef}
      className={classes.gameWindow}
      style={{ ...parent }}
    >
      {Array(objectCount)
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
              backgroundColor: `rgb(20, ${255 - i * (255 / objectCount)}, 120)`,
            }}
          />
        );
      })}
    </div>
  );
};
