import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";

const ProjectPage = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const { id } = useParams();
  const [tasks, setTasks] = useState<
    { id: string; title: string; status: string }[]
  >([]);

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;
    const newTask = {
      id: Math.random().toString(36).substring(7),
      title: taskTitle,
      status: "backlog",
    };
    setTasks((prevTasks) => (prevTasks ? [...prevTasks, newTask] : [newTask]));
    setTaskTitle("");
  };

  const handleChangeStatus = (taskId: string, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks
        ? prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        : []
    );
  };

  return (
    <div>
      <h1>Project: {id?.split("_")[0]}</h1>
      <Input
        type="text"
        placeholder="Enter Task Title"
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <Button onClick={handleAddTask} label="Add Task" />
      <div>
        <h2>Backlog</h2>
        <ul>
          {tasks
            .filter((task) => task.status === "backlog")
            .map((task) => (
              <li key={task.id}>
                {task.title}
                <Button
                  label="Move to To-Do"
                  onClick={() => handleChangeStatus(task.id, "todo")}
                />
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h2>To-Do</h2>
        <ul>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <li key={task.id}>
                {task.title}
                <Button
                  label="Move to Done"
                  onClick={() => handleChangeStatus(task.id, "done")}
                />
                <Button
                  label="Move to Backlog"
                  onClick={() => handleChangeStatus(task.id, "backlog")}
                />
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h2>Done</h2>
        <ul>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <li key={task.id}>
                {task.title}
                <Button
                  label="Move to To-Do"
                  onClick={() => handleChangeStatus(task.id, "todo")}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectPage;
