"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Project, PageInfo, projectsResponse } from "@/types/types";
import { fetchProjects } from "@/services/api/index";

export const ProjectsContext = createContext<projectsResponse>({
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
