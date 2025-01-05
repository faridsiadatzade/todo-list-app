import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  const handleCreateProject = () => {
    if (!projectName.trim()) return;
    const projectId = uuidv4();
    navigate(`/project/${projectName}_${projectId}`);
    setProjectName("");
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleCreateProject();
    }
  };

  return (
    <div className="flex items-center justify-items-center h-[100vh]">
      <section className="block m-auto lg:w-1/3 xl:w-1/4 bg-[#37052569] rounded-md py-8 px-6">
        <h1 className="text-center text-2xl p-1 text- font-bold block bg-white rounded-md border-2 border-primary">
          CREATE TODO LIST
        </h1>
        <Input
          type="text"
          placeholder="Enter Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          onClick={handleCreateProject}
          label="Submit"
          className="bg-primary p-2 mt-3 text-white"
        />
      </section>
    </div>
  );
};

export default Home;
