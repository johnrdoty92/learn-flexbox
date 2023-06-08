import { RefObject, useEffect, useState } from 'react';
import { animated } from '@react-spring/web';
import svgBlobFilter from 'assets/blobFilter.svg';

const svgFilterDefs = new URL(svgBlobFilter, import.meta.url).href;

export const GameBackdrop = ({
  gameWindowRef,
}: {
  gameWindowRef: RefObject<HTMLDivElement>;
}) => {
  // TODO: import game flex state
  // TODO: use react spring to control shapes
  const [dimensions, setDimensions] = useState({
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
  // TODO: create useEffect that changes spring state on game state changes
  return (
    <svg
      style={{ position: 'absolute' }}
      {...dimensions}
      filter={`url(${svgFilterDefs}#blob)`}
    >
      {/* TODO: use game flex state to map out shapes with animated.rect */}
      <rect
        x={100}
        y={101}
        fill="white"
        width={150}
        height={80}
        filter={`url(${svgFilterDefs}#blob)`}
      />
    </svg>
  );
};
