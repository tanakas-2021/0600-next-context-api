"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { fetchTasks } from "@/services/api";
const Page = () => {
  const [tasks, setTasks] = useState();
  const [pageInfo, setPageInfo] = useState();
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
  });
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
              <div className={styles.tableRow}>
                <div className={`${styles.tableCell} ${styles.tableCellTask}`}>
                  <div className={styles.taskContent}>{task.title}</div>
                </div>
                <div
                  className={`${styles.tableCell} ${styles.tableCellProject}`}
                >
                  <div className={styles.projectContent}>
                    <div className={styles.projectName}>{task.project.name}</div>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                </div>
                <div
                  className={`${styles.tableCell} ${styles.tableCellStatus}`}
                >
                  {task.status}
                </div>
                <div
                  className={`${styles.tableCell} ${styles.tableCellDeadline}`}
                >
                  {task.deadline}
                </div>
                <div
                  className={`${styles.tableCell} ${styles.tableCellDetail}`}
                >
                  詳細
                </div>
              </div>;
            })}
          </div>
        </div>
        <div className={styles.footer}></div>
      </div>
    </>
  );
};
export default Page;
