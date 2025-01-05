import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";

const ProjectPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<
    { id: string; title: string; description: string; status: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState<{
    id: string;
    title: string;
    description: string;
  } | null>(null);

  const handleAddTask = (title: string, description: string) => {
    const newTask = {
      id: Math.random().toString(36).substring(7),
      title,
      description,
      status: "backlog",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsModalOpen(false);
  };

  const handleEditTask = (id: string, title: string, description: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentTask(null);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const openEditModal = (task: {
    id: string;
    title: string;
    description: string;
  }) => {
    setIsEditing(true);
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center align-item-center text-3xl py-8 lg:w-2/3 m-auto">
      <h1 className="font-bold my-5 bg-gradient-to-l from-primary text-white rounded-[50px] p-2">
        Project: {id?.split("_")[0]}
      </h1>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Task" : "Add New Task"}
      >
        <AddTaskForm
          onAddTask={isEditing ? undefined : handleAddTask}
          onEditTask={isEditing ? handleEditTask : undefined}
          task={currentTask}
        />
      </Modal>

      <div className="flex justify-between w-full gap-2">
        <TaskList
          tasks={tasks}
          status="backlog"
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
        />
        <TaskList
          tasks={tasks}
          status="todo"
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
        />
        <TaskList
          tasks={tasks}
          status="done"
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
        />
      </div>

      <div className={`bottom-[20%] ${!isModalOpen && "fixed"}`}>
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
            setCurrentTask(null);
          }}
          label="Add Task"
          className="bg-primary px-4 py-2"
        />
      </div>
    </div>
  );
};

export default ProjectPage;
