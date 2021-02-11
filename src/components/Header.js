import PropTypes from "prop-types";
import Button from "./Button";
// Used to get the location of the page
import { useLocation } from "react-router-dom";

// déconstruction de variable -> ({title}) === (props.title)
const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {/* Si le components boutton se trouve dans lapage avec l'url '/'
      Alors j'affiche le components button */}
      {location.pathname === "/" && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
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
