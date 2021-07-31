import ReactDOMServer from 'react-dom/server'
import Highlight from "react-highlight";
import React from "react"

const Code = ({ children }) => {
  // console.log(ReactDOMServer.renderToStaticMarkup(children))
  // console.log(children)
  let code = "";
  if(React.isValidElement(children)){
    code = ReactDOMServer.renderToStaticMarkup(children)
  } else {
    code = children;
  }

  return <Highlight className="code html javascript jsx">{code}</Highlight>;
};

export default Code;
