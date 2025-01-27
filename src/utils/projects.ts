import axios from "axios";
import { projectsResponse } from "../types/types";

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  timeout: 1000,
});

export const fetchProjects = async (): Promise<projectsResponse> => {
  const response = await instance.get<projectsResponse>(
    "users/projects"
  );
  return {
    data: response.data.data,
    pageInfo: response.data.pageInfo,
  };
};
