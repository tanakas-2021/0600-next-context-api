import { useContext } from "react";
import { ProjectsContext } from "../contexts/projects";

export const useProjects = () => {
  return useContext(ProjectsContext);
};
