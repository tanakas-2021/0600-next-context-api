import styles from "./index.module.scss";
import { Task } from "@/services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useProjects } from "@/hooks/useProjects";
import dayjs from "dayjs";
import { IoArrowForwardOutline } from "react-icons/io5";

interface TaskRowProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TaskRow = ({ task, setTasks }: TaskRowProps) => {
  const statusMap: Record<string, string> = {
    scheduled: "未完了",
    completed: "完了",
  };
  const getStatusLabel = (status: string) => statusMap[status] || "不明";

  const [openProjectTaskId, setProjectOpenTaskId] = useState<string | null>(
    null
  );
  const [openStatusTaskId, setStatusOpenTaskId] = useState<string | null>(null);
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
  const { projects } = useProjects();
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
  return (
    <div key={task.id} className={styles.tableRow}>
      <div className={`${styles.tableCell} ${styles.tableCellTask}`}>
        <div className={styles.taskContent}>{task.title}</div>
      </div>
      <div
        className={`${styles.tableCell} ${styles.tableCellProject}`}
        onClick={() => handleDropdownClick(task.id, "project")}
      >
        <div className={`${styles.tableSelector} ${styles.selectContainer}`}>
          <div className={styles.selectValueContainer}>
            <p className={styles.projectName}>{task.project.name}</p>
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
                    onClick={() => handleProjectSelect(task.id, project.id)}
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
        <div className={`${styles.tableSelector} ${styles.selectContainer}`}>
          <div className={styles.selectValueContainer}>
            <p className={styles.projectName}>{getStatusLabel(task.status)}</p>
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
      <div className={`${styles.tableCell} ${styles.tableCellDeadline}`}>
        {dayjs(task.deadline).format("YYYY/MM/DD")}
      </div>
      <div className={`${styles.tableCell} ${styles.tableCellDetail}`}>
        <IoArrowForwardOutline size={12} />
      </div>
    </div>
  );
};
