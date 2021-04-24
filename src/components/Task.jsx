import { FaTimes } from "react-icons/fa";

const Task = ({ onToggle,onDelete, task: { reminder, text, day, id } }) => {
  return (
    <div className={`task ${reminder && `reminder`}`} onDoubleClick={()=>onToggle(id)}>
      <h3>
        {text}{" "}
        <FaTimes
          onClick={()=>onDelete(id)}
          style={{ color: `red`, cursor: `pointer` }}
        />{" "}
      </h3>
      <p>{day}</p>
    </div>
  );
};

export default Task;
