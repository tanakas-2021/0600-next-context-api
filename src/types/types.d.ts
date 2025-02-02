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

export interface PageInfo {
  page: number;
  limit: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface projectsResponse {
  projects: Project[];
  pageInfo: PageInfo;
}
