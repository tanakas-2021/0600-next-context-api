"use client";

import styles from "./page.module.scss";
import React from "react";
import { Projects } from "@/components/projects";
import { useProjects } from '../../hooks/useProjects';

const Page = () => {
  const { pageInfo } = useProjects();
  const currentPage = pageInfo.page;
  const endPage = Math.ceil(pageInfo.totalCount / pageInfo.limit);
  const totalCount = pageInfo.totalCount;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <h2 className={styles.title}>プロジェクト</h2>
        </div>
        <div className={styles.body}>
          <div className={styles.projectsHeader}>
            <p className={styles.title}>
              <span>{`${currentPage} / ${endPage}`}</span>
              <span>{` (${totalCount}件) `}</span>
            </p>
          </div>
          <Projects />
        </div>
      </div>
    </div>
  );
};

export default Page;
