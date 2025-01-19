import axios from "axios";
import { Project, projectsResponse } from "../types/types";

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<projectsResponse>(
      "http://localhost:3000/api/v1/users/projects"
    );
    return response.data.data;
  } catch {
    alert("データの取得に失敗しました");
    return [];
  }
};
