import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "./../../components/Textarea";
interface AddTaskFormProps {
  onAddTask?: (title: string, description: string) => void;
  onEditTask?: (id: string, title: string, description: string) => void;
  task?: { id: string; title: string; description: string } | null;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onAddTask,
  onEditTask,
  task,
}) => {
  const [taskTitle, setTaskTitle] = useState(task?.title || "");
  const [taskDescription, setTaskDescription] = useState(
    task?.description || ""
  );

  const handleSubmit = () => {
    if (!taskTitle.trim()) return;
    if (onAddTask) {
      onAddTask(taskTitle, taskDescription);
    }
    if (onEditTask && task) {
      onEditTask(task.id, taskTitle, taskDescription);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Task Title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <Textarea
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        label={onAddTask ? "Add Task" : "Save Changes"}
      />
    </div>
  );
};

export default AddTaskForm;