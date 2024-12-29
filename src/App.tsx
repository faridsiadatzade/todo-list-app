import React from "react";
import { TaskProvider } from "./context/TaskContext";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div>
        <h1>To-Do List</h1>
      </div>
    </TaskProvider>
  );
};

export default App;
