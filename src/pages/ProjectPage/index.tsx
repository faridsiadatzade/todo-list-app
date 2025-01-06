import { useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const statuses = ["backlog", "todo", "done"];

const ProjectPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState<Partial<Task> | null>(null);

  const handleAddTask = (title: string, description: string) => {
    const newTask = {
      id: Math.random().toString(36).substring(7),
      title,
      description,
      status: "backlog",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    closeModal();
  };

  const handleEditTask = (id: string, title: string, description: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );
    closeModal();
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const openEditModal = (task: Task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentTask(null);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = [...tasks];
    const draggedTaskIndex = tasks.findIndex((task) => task.id === draggableId);
    if (draggedTaskIndex === -1) return;

    updatedTasks[draggedTaskIndex].status = destination.droppableId;
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center align-item-center text-3xl py-8 lg:w-2/3 m-auto">
      <h1 className="font-bold my-9">Project: {id?.split("_")[0]}</h1>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Task" : "Add New Task"}
      >
        <AddTaskForm
          onAddTask={!isEditing ? handleAddTask : undefined}
          onEditTask={isEditing ? handleEditTask : undefined}
          task={currentTask}
        />
      </Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 w-full gap-2">
          {statuses.map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="my-4 w-full"
                >
                  <TaskList
                    tasks={tasks}
                    status={status}
                    onEdit={openEditModal}
                    onDelete={handleDeleteTask}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

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
