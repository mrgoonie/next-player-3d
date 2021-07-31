import PropTypes from "prop-types";

/**
 * @param  {object} props - Component properties
 * @param  {React.Component} props.children  Các children component
 * @param  {('Quan'|'Tam'|'Duy')} props.name  Chọn tên cho component
 */
const ComponentA = ({ name = "Quan" }) => {
  return <div>{name}</div>;
};

ComponentA.propTypes = {
  children: PropTypes.element,
  name: PropTypes.string.isRequired,
};

export default ComponentA;
