import _startsWith from "lodash/startsWith";

/**
 * @param  {Object} props
 * @param  {('admin'|'app-store-filled'|'arrow-collapse'|'arrow-expand'|'arrow-left-thin'|'arrow-left'|'arrow-right-tail-thin'|'arrow-right-thin'|'arrow-right'|'bell'|'book-open'|'close'|'dashboard'|'delete'|'done'|'file'|'hamburger'|'hamburger-thin'|'home'|'link'|'mail'|'play-circle'|'search'|'setting'|'upload'|'user'|'share'|'sound'|'sound-off')} props.name
 * @param  {React.CSSProperties} [props.style]
 * @param  {String} [props.fill]
 * @param  {String} [props.color]
 * @param  {Number} [props.size=16]
 * @param  {Number} [props.width=16]
 * @param  {Number} [props.height]
 */
const DashkitIcon = function ({ name, style, fill, color, size, width, height, className, ...rest }) {
  let svgContent = require(`./icons/${name}.svg`);
  let iconColor = fill || color;

  let attrs = svgContent.split(" ");
  let sizes = {};
  let ratio = 1;

  attrs.map((attr) => {
    if (_startsWith(attr, "viewBox")) {
      let r = attr.split(" ");
      let h = r[r.length - 1];
      let w = r[r.length - 2];
      ratio = h / w;
    }
    if (_startsWith(attr, "width")) {
      sizes.width = parseFloat(attr.replace(/"/g, "").split("=")[1]);
      svgContent = svgContent.replace(attr, "");
    }
    if (_startsWith(attr, "height")) {
      sizes.height = parseFloat(attr.replace(/"/g, "").split("=")[1]);
      svgContent = svgContent.replace(attr, "");
    }
  });
  // console.log(sizes);

  let iconWidth = 16;
  let iconHeight = 16 * ratio;

  if (sizes.width) iconWidth = sizes.width + "px";
  if (sizes.height) iconHeight = sizes.height + "px";

  if (width) iconWidth = width;
  if (height) iconHeight = height;
  if (width && !height) iconHeight = iconWidth * ratio;

  if (size) {
    iconWidth = size;
    iconHeight = iconWidth * ratio;
  }

  return (
    <>
      <style jsx>{`
        .svg {
          ${iconColor ? `color: ${iconColor};` : ""}
          line-height: 0;
          display: inline-block;
          vertical-align: middle;
          ${iconWidth ? `width: ${isNaN(iconWidth) ? iconWidth : iconWidth + "px"};` : ""}
          ${iconHeight ? `height: ${isNaN(iconHeight) ? iconHeight : iconHeight + "px"};` : ""}
        }
      `}</style>
      <span
        style={style}
        className={`admin-icon svg ${className ? className : ""}`}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        {...rest}
      />
    </>
  );
};

export default DashkitIcon;
