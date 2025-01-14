"use client";

import { Header } from "@/components/header";
import styles from "./page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

interface Project {
  id: string;
  name: string;
  deadline: string;
  slug: string;
  goal: string;
  shouldbe: string;
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

interface Response {
  data: Project[];
  pageInfo: PageInfo;
}

const Page = () => {
  const [isShow, setIsShow] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const onClickToggle = () => {
    const newIsShow = !isShow;
    setIsShow(newIsShow);
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Response>(
          "http://localhost:3000/api/v1/users/projects"
        );
        setProjects([...response.data.data]);
      } catch {
        alert("データの取得に失敗しました");
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={isShow ? styles.sidebarShow : styles.sidebarHidden}>
          <div className={styles.sidebarContents}>
            <div className={styles.sidebarHeader}>
              <div onClick={onClickToggle}>
                {isShow ? (
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className={styles.sidebarToggle}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={styles.sidebarToggle}
                  />
                )}
              </div>
            </div>
            <div className={styles.sidebarBody}>
              {isShow ? (
                <ul className={styles.sidebarBodyList}>
                  <li className={styles.sidebarBodyListItem}>
                    <div className={styles.sidebarBodyListItemTitle}>
                      ダッシュボード
                    </div>
                  </li>
                  <li className={styles.sidebarBodyListItem}>
                    <div className={styles.sidebarBodyListItemTitle}>
                      タスク
                    </div>
                  </li>
                  <li className={styles.sidebarBodyListItem}>
                    <div className={styles.sidebarBodyListItemTitle}>
                      プロジェクト
                    </div>
                  </li>
                  <ul>
                    {projects.map((project) => {
                      return (
                        <li
                          key={project.id}
                          className={styles.sidebarProjectListItem}
                        >
                          <div>{project.name}</div>
                          <span className={styles.sidebarProjectDeadline}>
                            {dayjs(project.deadline).format("YYYY/MM/DD")}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.mainContents}></div>
      </main>
    </>
  );
};

export default Page;
