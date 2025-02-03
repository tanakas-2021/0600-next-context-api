import axios from "axios";

interface Project {
  id: string;
  name: string;
  deadline: string;
  slug: string;
  goal: string;
  shouldbe: string;
  color: string;
  stats: {
    kinds: {
      milestone: number;
      task: number;
      total: number;
    };
    states: {
      scheduled: number;
      archived: number;
      completed: number;
    };
    total: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  milestones: any[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

interface Task {
  id: string;
  description: string;
  kind: string;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  children: [];
  project: Project;
}

interface PageInfo {
  page: number;
  limit: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  timeout: 1000,
});

export const fetchProjects = async (): Promise<{
  projects: Project[];
  pageInfo: PageInfo;
}> => {
  try {
    const response = await instance.get("users/projects");
    return {
      projects: response.data.data,
      pageInfo: response.data.pageInfo,
    };
  } catch {
    throw new Error();
  }
};

export const fetchTasks = async (): Promise<{
  tasks: Task[];
  pageInfo: PageInfo;
}> => {
  try {
    const response = await instance.get("users/tasks");
    return {
      tasks: response.data.data,
      pageInfo: response.data.pageInfo,
    };
  } catch {
    throw new Error();
  }
};
