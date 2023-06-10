import { RefObject, useEffect, useState } from 'react';
import { animated, useSprings } from '@react-spring/web';
import { useBlockContext } from 'contexts/BlockContext';
import { ParentFlexPayload } from 'constants/flexProperties';

type PlatformSpringValue = {
  x: number;
  y: number;
};

const getSpringValues =
  (state: ParentFlexPayload) =>
  (index: number): PlatformSpringValue => {
    // TODO: develop function to determine coordinates based on flex state
    let x, y;
    switch (state.flexDirection) {
      case 'column': {
        x = index * 100;
        y = index * 200;
        break;
      }
      case 'row': {
        x = index * 200;
        y = index * 100;
        break;
      }
      default: {
        x = index * 50;
        y = index * 50;
      }
    }
    return {
      x,
      y,
    };
  };

export const GameBackdrop = ({
  gameWindowRef,
}: {
  gameWindowRef: RefObject<HTMLDivElement>;
}) => {
  const {
    state: { parent, objectCount },
  } = useBlockContext();
  const [springs, api] = useSprings(objectCount, getSpringValues(parent), [
    objectCount,
  ]);
  const [{ width, height }, setDimensions] = useState({
    width: gameWindowRef.current?.clientWidth,
    height: gameWindowRef.current?.clientHeight,
  });
  // TODO: create context for game window dimensions
  useEffect(() => {
    if (!gameWindowRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    resizeObserver.observe(gameWindowRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    api.start(getSpringValues(parent));
  }, [parent]);

  return (
    <div
      style={{
        position: 'absolute',
        filter: `url(#blob)`,
        width,
        height,
      }}
    >
      {springs.map(({ x, y }, i) => {
        return (
          <animated.div
            key={i}
            style={{
              backgroundColor: 'white',
              position: 'relative',
              width: 200,
              height: 100,
              left: x,
              top: y,
            }}
          />
        );
      })}
    </div>
  );
};
