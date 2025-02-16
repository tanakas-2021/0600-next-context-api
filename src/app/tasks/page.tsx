"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { IoArrowForwardOutline } from "react-icons/io5";
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
const maxCountOptions = [20, 50, 100];

const Page = () => {
  const [maxCount, setMaxCount] = useState(20);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const endPage = pageInfo && Math.ceil(pageInfo.totalCount / pageInfo.limit);
  const { projects } = useContext(ProjectsContext);
  const [openProjectTaskId, setProjectOpenTaskId] = useState<string | null>(
    null
  );
  const [openStatusTaskId, setStatusOpenTaskId] = useState<string | null>(
    null
  );
  const handleDropdownClick = (taskId: string, column: string) => {
    switch (column) {
      case "project":
        setProjectOpenTaskId(openProjectTaskId === taskId ? null : taskId); // 既に開いている場合は閉じ、閉じている場合は開く
        break;
      case "status":
        setStatusOpenTaskId(openStatusTaskId === taskId ? null : taskId);
        break;
    }
  };
  const handleProjectSelect = (taskId: string, projectId: string) => {
    const newProject = projects.find((project) => project.id === projectId);
    // 見つからなかった場合は処理を中断
    if (!newProject) {
      alert("選択したプロジェクトが存在しません");
      return;
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              project: newProject,
            }
          : task
      )
    );
  };
  const handleStatusSelect = (taskId: string, status: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
            }
          : task
      )
    );
  };
  const handleMaxCount = async (count: number) => {
    try {
      setMaxCount(count);
      const { tasks, pageInfo } = await fetchTasks(count);
      setTasks(tasks);
      setPageInfo(pageInfo);
    } catch {
      alert("データの取得に失敗しました");
    }
  };
  useEffect(() => {
    const getTasks = async () => {
      try {
        const { tasks, pageInfo } = await fetchTasks(maxCount);
        setTasks(tasks);
        setPageInfo(pageInfo);
      } catch {
        alert("データの取得に失敗しました");
      }
    };
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        <h2 className={styles.title}>タスク</h2>
      </div>
      <div className={styles.container}>
        {pageInfo ? (
          <div className={styles.header}>
            <div className={styles.headerControl}>
              <div className={styles.headerNumber}>
                <div className={styles.headerPageIndex}>
                  <span>{`${pageInfo?.page} / ${endPage}`}</span>
                </div>
                <div className={styles.headerPageCount}>
                  <label htmlFor="displayCount">表示件数：</label>
                  <select
                    id="displayCount"
                    className={styles.displayCountSelecter}
                    value={maxCount}
                    onChange={(e) => handleMaxCount(Number(e.target.value))}
                  >
                    {maxCountOptions.map((option) => (
                      <option
                        key={option}
                        value={option}
                      >{`${option}件`}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className={styles.headerTotal}>
                    {`${pageInfo?.totalCount}件`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

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
                    onClick={() => handleDropdownClick(task.id, "project")}
                  >
                    <div
                      className={`${styles.tableSelector} ${styles.selectContainer}`}
                    >
                      <div className={styles.selectValueContainer}>
                        <p className={styles.projectName}>
                          {task.project.name}
                        </p>
                        <div className={styles.iconContainer}>
                          <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                      </div>
                      <div className={styles.selectPullDownShow}>
                        {openProjectTaskId === task.id && (
                          <ul className={styles.selectPullDown}>
                            {projects.map((project) => (
                              <li
                                key={project.id}
                                onClick={() =>
                                  handleProjectSelect(task.id, project.id)
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
                    onClick={() => handleDropdownClick(task.id, "status")}
                  >
                    <div
                      className={`${styles.tableSelector} ${styles.selectContainer}`}
                    >
                      <div className={styles.selectValueContainer}>
                        <p className={styles.projectName}>
                          {getStatusLabel(task.status)}
                        </p>
                        <div className={styles.iconContainer}>
                          <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                      </div>
                      <div className={styles.selectPullDownShow}>
                        {openStatusTaskId === task.id && (
                          <ul className={styles.selectPullDown}>
                            {Object.entries(statusMap).map(([key, value]) => (
                              <li
                                key={key}
                                onClick={() => handleStatusSelect(task.id, key)}
                                className={styles.selectOption}
                              >
                                {value}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
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
                    <IoArrowForwardOutline size={12} />
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
