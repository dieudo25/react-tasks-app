// Use Link components so that the page doesn't refresh when <a> is pressed
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4>Version 1.0.0</h4>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default About;
