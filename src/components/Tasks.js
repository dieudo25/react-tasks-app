import PropTypes from "prop-types";
import Task from './Task'


const Tasks = ({ tasks, onDelete, onToggle }) => {
  
  return (
      // Empty fragment, take the place of a div that is not used
      // Since a react components can only render 1 tag
      <>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
        ))}
      </>
  );
};

Tasks.propTypes = {};

export default Tasks;
