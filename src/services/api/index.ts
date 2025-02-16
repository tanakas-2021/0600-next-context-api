import axios from "axios";

export interface Project {
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

export interface Task {
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

export interface PageInfo {
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

// const maxCount = 100;

export const fetchProjects = async (): Promise<{
  projects: Project[];
  pageInfo: PageInfo;
}> => {
  const response = await instance.get("users/projects");
  const { data, pageInfo } = response.data;
  return {
    projects: data,
    pageInfo,
  };
};

export const fetchTasks = async (maxCount:number): Promise<{
  tasks: Task[];
  pageInfo: PageInfo;
}> => {
  const response = await instance.get("users/tasks", {
    params: {
      limit: maxCount,
    },
  });
  const { data, pageInfo } = response.data;
  return {
    tasks: data,
    pageInfo,
  };
};
