import axios from "axios";
import { projectsResponse } from "../types/types";

export const fetchProjects = async (): Promise<projectsResponse> => {
  try {
    const response = await axios.get<projectsResponse>(
      "http://localhost:3000/api/v1/users/projects"
    );
    return {
      data: response.data.data,
      pageInfo: response.data.pageInfo,
    };
  } catch {
    alert("データの取得に失敗しました");
    return {
      data: [],
      pageInfo: {
        page: 0,
        limit: 0,
        totalCount: 0,
        hasNext: false,
        hasPrevious: false,
      },
    };
  }
};
