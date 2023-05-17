import { RefObject, useEffect, useRef, useState } from 'react';

export const Canvas = ({
  gameWindowRef,
}: {
  gameWindowRef: RefObject<HTMLDivElement>;
}) => {
  const nodeRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({
    width: gameWindowRef.current?.clientWidth,
    height: gameWindowRef.current?.clientHeight,
  });

  useEffect(() => {
    const ctx = nodeRef.current?.getContext('2d');
    if (!ctx) return;
    let requestId: number;
    const speed = 5;
    let x = 0;
    let dx = 1;
    let y = 0;
    let dy = 1;
    const render = () => {
      let isCollision = false;
      gameWindowRef.current?.childNodes.forEach((child) => {
        if (!(child instanceof HTMLElement)) return;
        if (
          x > child.offsetLeft &&
          x < child.offsetLeft + child.offsetWidth &&
          y > child.offsetTop &&
          y < child.offsetHeight + child.offsetTop
        )
          isCollision = true;
      });

      ctx.fillStyle = isCollision ? '#FF0000' : '#FFFFFF';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 360);
      ctx.fill();
      if (x > ctx.canvas.offsetWidth) dx = -1;
      if (x < 0) dx = 1;
      x += speed * dx;
      if (y > ctx.canvas.offsetHeight) dy = -1;
      if (y < 0) dy = 1;
      y += speed * dy;
      requestId = requestAnimationFrame(render);
    };
    render();

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    if (gameWindowRef.current) resizeObserver.observe(gameWindowRef.current);
    return () => {
      if (requestId !== undefined) cancelAnimationFrame(requestId);
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
