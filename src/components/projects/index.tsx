import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCodeCommit,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import { Project } from "@/types/types";
import styles from "./index.module.scss";
import { fetchProjects } from "@/utils/projects";

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data } = await fetchProjects();
        setProjects(data);
      } catch {
        alert("データの取得に失敗しました");
      }
    };
    getProjects();
  }, []);
  return (
    <ul className={styles.projectList}>
      {projects.map((project) => {
        return (
          <li key={project.id}>
            <a href={`/projects/${project.slug}`} className={styles.cardAnchor}>
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
  );
};
