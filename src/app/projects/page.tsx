"use client";
import styles from "./page.module.scss";
import React, { useEffect, useState } from "react";

import { fetchProjects } from "@/utils/projects";
import { Projects } from "@/components/projects";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [endPage, setEndPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const getPageInfo = async () => {
      try {
        const { pageInfo } = await fetchProjects();
        setCurrentPage(pageInfo.page);
        setEndPage(Math.floor(pageInfo.totalCount / pageInfo.limit) + 1);
        setTotalCount(pageInfo.totalCount);
      } catch {
        alert("データの取得に失敗しました");
      }
    };
    getPageInfo();
  }, []);
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
