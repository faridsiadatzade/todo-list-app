import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();

  const tasks = [
    { id: "1", title: "Task 1", status: "backlog" },
    { id: "2", title: "Task 2", status: "todo" },
    { id: "3", title: "Task 3", status: "done" },
  ];

  return (
    <div>
      <h1>Project: {id?.split("_")[0]}</h1>
      <div>
        <h2>Backlog</h2>
        <ul>
          {tasks
            .filter((task) => task.status === "backlog")
            .map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
        </ul>
      </div>
      <div>
        <h2>To-Do</h2>
        <ul>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
        </ul>
      </div>
      <div>
        <h2>Done</h2>
        <ul>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectPage;
