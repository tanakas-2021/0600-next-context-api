"use client";

import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useContext } from "react";
import { ProjectsContext } from "@/contexts/projects";

export const Sidebar = () => {
  const [isShow, setIsShow] = useState(true);
  const {projects} = useContext(ProjectsContext);

  const onClickToggle = () => {
    const newIsShow = !isShow;
    setIsShow(newIsShow);
  };
  return (
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
                <div className={styles.sidebarBodyListItemTitle}>タスク</div>
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
                      <div
                        className={styles.sidebarProjectDot}
                        style={
                          {
                            "--dot-color": `${project.color}`,
                          } as React.CSSProperties
                        }
                      />
                      <div>{project.name}</div>
                      <div className={styles.sidebarProjectDeadline}>
                        {dayjs(project.deadline).format("YYYY/MM/DD")}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};
