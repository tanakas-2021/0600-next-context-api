"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.scss";
import React, { useEffect, useState, useContext } from "react";
import { fetchTasks } from "@/services/api";
import dayjs from "dayjs";
import { ProjectsContext } from "@/contexts/projects";
import { PageInfo, Task } from "@/services/api";

const statusMap: Record<string, string> = {
  scheduled: "未完了",
  completed: "完了",
};
const getStatusLabel = (status: string) => statusMap[status] || "不明";

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const { projects } = useContext(ProjectsContext);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const handleDropdownClick = (taskId: string) => {
    setOpenDropdown(openDropdown === taskId ? null : taskId); // 既に開いている場合は閉じ、閉じている場合は開く
  };
  const [selectedProject, setSelectedProject] = useState<
    Record<string, string>
  >({});
  const handleProjectSelect = (taskId: string, projectName: string) => {
    setSelectedProject((prevSelectedProject) => ({
      ...prevSelectedProject,
      [taskId]: projectName, // taskIdをキーとして選択したプロジェクト名を設定
    }));
  };
  useEffect(() => {
    const getTasks = async () => {
      try {
        const { tasks, pageInfo } = await fetchTasks();
        setTasks(tasks);
        setPageInfo(pageInfo);
      } catch {
        alert("データの取得に失敗しました");
      }
    };
    getTasks();
  }, []);
  return (
    <>
      <div>
        <h2 className={styles.title}>タスク</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerControl}>
            <div className={styles.headerNumber}>
              <div className={styles.headerPageIndex}>
                <span>1/5</span>
              </div>
              <div className={styles.headerPageCount}>
                <label htmlFor="displayCount">表示件数：</label>
                <select id="displayCount">
                  <option value="20">20件</option>
                  <option value="50">50件</option>
                  <option value="100">100件</option>
                </select>
              </div>
              <div>
                <span className={styles.headerTotal}>100件</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div
              className={`${styles.tableHeaderCell} ${styles.tableCellTask}`}
            >
              タスク
            </div>
            <div
              className={`${styles.tableHeaderCell} ${styles.tableCellProject}`}
            >
              プロジェクト
            </div>
            <div
              className={`${styles.tableHeaderCell} ${styles.tableCellStatus}`}
            >
              ステータス
            </div>
            <div
              className={`${styles.tableHeaderCell} ${styles.tableCellDeadline}`}
            >
              期限日
            </div>
            <div
              className={`${styles.tableHeaderCell} ${styles.tableCellDetail}`}
            ></div>
          </div>
          <div>
            {tasks.map((task) => {
              return (
                <div key={task.id} className={styles.tableRow}>
                  <div
                    className={`${styles.tableCell} ${styles.tableCellTask}`}
                  >
                    <div className={styles.taskContent}>{task.title}</div>
                  </div>
                  <div
                    className={`${styles.tableCell} ${styles.tableCellProject}`}
                    onClick={() => handleDropdownClick(task.id)}
                  >
                    <div
                      className={`${styles.tableSelector} ${styles.selectContainer}`}
                    >
                      <div className={styles.selectValueContainer}>
                        <p className={styles.projectName}>
                          {selectedProject.hasOwnProperty(task.id)
                            ? selectedProject[task.id]
                            : task.project.name}
                        </p>
                        <div className={styles.iconContainer}>
                          <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                      </div>
                      <div className={styles.selectPullDownShow}>
                        {openDropdown === task.id && (
                          <ul className={styles.selectPullDown}>
                            {projects.map((project) => (
                              <li
                                key={project.id}
                                onClick={() =>
                                  handleProjectSelect(task.id, project.name)
                                }
                                className={styles.selectOption}
                              >
                                {project.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.tableCell} ${styles.tableCellStatus}`}
                  >
                    <div className={styles.projectContent}>
                      <div className={styles.projectName}>
                        {getStatusLabel(task.status)}
                      </div>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  </div>
                  <div
                    className={`${styles.tableCell} ${styles.tableCellDeadline}`}
                  >
                    {dayjs(task.deadline).format("YYYY/MM/DD")}
                  </div>
                  <div
                    className={`${styles.tableCell} ${styles.tableCellDetail}`}
                  >
                    <FontAwesomeIcon icon={faCircleChevronRight} size="xl" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.footer}></div>
      </div>
    </>
  );
};
export default Page;
