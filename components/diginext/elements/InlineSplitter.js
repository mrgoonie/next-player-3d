const InlineSplitter = ({ children, width = 5 }) => {
  return (
    <>
      <style jsx>{`
        .splitter {
          display: inline-block;
          min-width: ${width}px;
          text-align: center;
        }
      `}</style>
      <span className="splitter">{children}</span>
    </>
  );
};

export default InlineSplitter;
