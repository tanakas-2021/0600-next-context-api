"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { fetchProjects } from "@/services/api/index";

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

interface PageInfo {
  page: number;
  limit: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const ProjectsContext = createContext<{
  projects: Project[];
  pageInfo: PageInfo;
}>({
  projects: [],
  pageInfo: {
    page: 1,
    limit: 20,
    totalCount: 0,
    hasNext: false,
    hasPrevious: false,
  },
});

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 1,
    limit: 20,
    totalCount: 0,
    hasNext: false,
    hasPrevious: false,
  });

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { projects, pageInfo } = await fetchProjects();
        setProjects(projects);
        setPageInfo(pageInfo);
      } catch {
        alert("データの取得に失敗しました");
      }
    };
    getProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, pageInfo }}>
      {children}
    </ProjectsContext.Provider>
  );
};
