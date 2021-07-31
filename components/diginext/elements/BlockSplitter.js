const BlockSplitter = ({ height = 10 }) => {
  return (
    <>
      <style jsx>{`
        .splitter {
          display: block;
          min-height: ${height}px;
        }
      `}</style>
      <span className="splitter"></span>
    </>
  );
};

export default BlockSplitter;
