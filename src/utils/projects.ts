import axios from "axios";
import { projectsResponse } from "../types/types";

export const fetchProjects = async (): Promise<projectsResponse> => {
  const response = await axios.get<projectsResponse>(
    "http://localhost:3000/api/v1/users/projects"
  );
  return {
    data: response.data.data,
    pageInfo: response.data.pageInfo,
  };
};
