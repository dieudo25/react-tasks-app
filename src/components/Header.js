import PropTypes from "prop-types";
import Button from "./Button";

// déconstruction de variable -> ({title}) === (props.title)
const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </header>
  );
};

// Define default props
Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  // Impose des contraintes au données
  // Le propos title doit etre de type String et il est aussi requis
  title: PropTypes.string.isRequired,
};

export default Header;
