"use client";
import styles from "./page.module.scss";
import React, { useEffect, useState } from "react";
import {
  faCalendar,
  faCodeCommit,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchProjects } from "@/utils/projects";
import { Project } from "@/types/types";
import dayjs from "dayjs";

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [endPage, setEndPage] = useState(0);
  useEffect(() => {
    const getProjects = async () => {
      const { data, pageInfo } = await fetchProjects();
      if (data) {
        setProjects(data);
        setCurrentPage(pageInfo.page);
        setEndPage(Math.floor(pageInfo.totalCount / pageInfo.limit) + 1);
      }
    };
    getProjects();
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
              <span>{` (${projects.length}件) `}</span>
            </p>
          </div>
          <ul className={styles.projectList}>
            {projects.map((project) => {
              return (
                <li key={project.id}>
                  <a
                    href={`/projects/${project.slug}`}
                    className={styles.cardAnchor}
                  >
                    <div
                      className={styles.card}
                      style={{ borderLeft: `5px solid ${project.color}` }}
                    >
                      <div className={styles.cardHeader}>
                        <h2
                          className={styles.cardTitle}
                          style={{ color: `5px solid ${project.color}` }}
                        >
                          {project.name}
                        </h2>
                        <div className={styles.cardDeadline}>
                          <FontAwesomeIcon
                            icon={faCalendar}
                            color={`${project.color}`}
                            className={styles.calenderIcon}
                          />
                          <span className={styles.cardDeadlineDate}>
                            {dayjs(project.deadline).format("YYYY/MM/DD")}
                          </span>
                        </div>
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.cardGoal}>
                          <div>{project.goal}</div>
                        </div>
                        <div className={styles.shouldbe}>
                          <div>{project.shouldbe}</div>
                        </div>
                      </div>
                      <div className={styles.cardFooter}>
                        <div className={styles.cardStats}>
                          <div className={styles.cardMilestone}>
                            <span>
                              <FontAwesomeIcon
                                icon={faCodeCommit}
                                color={`${project.color}`}
                                className={styles.codeCommitIcon}
                              />
                            </span>
                            <span className={styles.cardStatsText}>
                              {project.stats.kinds.milestone}
                            </span>
                          </div>
                          <div className={styles.cardTask}>
                            <span className={styles.cardIcon}>
                              <FontAwesomeIcon
                                icon={faFile}
                                color={`${project.color}`}
                              />
                            </span>
                            <span className={styles.cardStatsText}>
                              {project.stats.kinds.task}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
