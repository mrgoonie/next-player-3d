export const BS = ({ size = 10 }) => {
  return (
    <>
      <style jsx>{`
        .splitter {
          display: block;
          min-height: ${size}px;
        }
      `}</style>
      <span className="splitter"></span>
    </>
  );
};

export const LS = ({ children, size = 5 }) => {
  return (
    <>
      <style jsx>{`
        .splitter {
          display: inline-block;
          min-width: ${size}px;
          text-align: center;
        }
      `}</style>
      <span className="splitter">{children}</span>
    </>
  );
};
