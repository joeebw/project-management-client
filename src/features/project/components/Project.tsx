import { useParams } from "react-router";

const Project = () => {
  const { id } = useParams();
  return <div>Project {id}</div>;
};

export default Project;
