import { RefObject, useEffect, useRef, useState } from 'react';
import { Dot, Renderer } from './Renderer';

export const Canvas = ({
  gameWindowRef,
}: {
  gameWindowRef: RefObject<HTMLDivElement>;
}) => {
  // TODO: use a ref to store all the game objects
  // then call state updater on game objects to
  // give access to state, node refs, etc
  const nodeRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({
    width: gameWindowRef.current?.clientWidth,
    height: gameWindowRef.current?.clientHeight,
  });

  useEffect(() => {
    const ctx = nodeRef.current?.getContext('2d');
    if (!ctx || !gameWindowRef.current) return;
    const dots = [];
    for (let i = 0; i < 10; i++) {
      dots.push(new Dot(ctx, gameWindowRef.current.childNodes));
    }
    const renderer = new Renderer(ctx, dots);
    const requestId = renderer.render();

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    if (gameWindowRef.current) resizeObserver.observe(gameWindowRef.current);
    return () => {
      cancelAnimationFrame(requestId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      width={dimensions.width ?? 640}
      height={dimensions.height ?? 480}
      ref={nodeRef}
      style={{
        outline: '3px dotted limegreen',
        position: 'absolute',
        zIndex: 9,
      }}
    ></canvas>
  );
};
