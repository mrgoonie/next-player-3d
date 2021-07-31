
const Svg = function ({ src, className, fill }) {
  
  const svgContent = require(`public/${src}.svg`)

  return (
    <>
      <style jsx>{`
        .svg { 
          ${fill ? `color: ${fill};` : ""}
          line-height: 1em;
          display: inline-block;
        }
      `}</style>
      <span className={className ? ["svg", className].join(" ") : "svg"} dangerouslySetInnerHTML={{ __html: svgContent }} />
    </>
  )
}

export default Svg