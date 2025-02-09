"use client";

import styles from "./page.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { ProjectsContext } from "@/contexts/projects";
import { Projects } from "@/components/projects";

const Page = () => {
  const { pageInfo } = useContext(ProjectsContext);
  const currentPage = pageInfo.page;
  const endPage = Math.floor(pageInfo.totalCount / pageInfo.limit) + 1;
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
