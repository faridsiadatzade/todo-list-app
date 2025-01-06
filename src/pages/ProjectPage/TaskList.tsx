import { Draggable } from "react-beautiful-dnd";
import Button from "../../components/Button";

interface TaskListProps {
  tasks: { id: string; title: string; description: string; status: string }[];
  status: string;
  onEdit: (task: {
    id: string;
    title: string;
    description: string;
    status: string;
  }) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  status,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <h3 className="text-lg font-bold my-5 bg-gradient-to-l from-primary text-white rounded-[50px] text-center p-2 mx-auto mb-4 min-w-max max-w-[100px] shadow-2xl">
        {status}
      </h3>
      <ul className="space-y-2">
        {tasks
          .filter((task) => task.status === status)
          .map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <li
                  key={task.id}
                  className="w-full m-auto bg-gradient-to-r from-primary to-[#e5d4da] rounded-md p-4 border border-primary break-words whitespace-normal max-w-[300px] shadow-lg"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div>
                    <h3 className="font-bold text-lg">{task.title}</h3>
                    <p className="text-sm">{task.description}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button label="Edit" onClick={() => onEdit(task)} />
                    <Button label="Delete" onClick={() => onDelete(task.id)} />
                  </div>
                </li>
              )}
            </Draggable>
          ))}
      </ul>
    </>
  );
};

export default TaskList;
