export const BlobDefs = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <filter id="blob">
      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
      <feColorMatrix
        in="blur"
        values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
      />
      <feDropShadow dx="0" dy="20" stdDeviation="0" floodColor="blue" />
    </filter>
  </svg>
);
