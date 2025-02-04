"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { fetchTasks } from "@/services/api";
import dayjs from "dayjs";

interface PageInfo {
  page: number;
  limit: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface Task {
  id: string;
  description: string;
  kind: string;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  children: [];
  project: Project;
}

interface Project {
  id: string;
  name: string;
  deadline: string;
  slug: string;
  goal: string;
  shouldbe: string;
  color: string;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  milestones: any[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

const statusMap: Record<string, string> = {
  scheduled: "未完了",
  completed: "完了",
};

const getStatusLabel = (status: string) => statusMap[status] || "不明";

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
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
            {(tasks ?? []).map((task) => {
              return (
                <div key={task.id} className={styles.tableRow}>
                  <div
                    className={`${styles.tableCell} ${styles.tableCellTask}`}
                  >
                    <div className={styles.taskContent}>{task.title}</div>
                  </div>
                  <div
                    className={`${styles.tableCell} ${styles.tableCellProject}`}
                  >
                    <div className={styles.projectContent}>
                      <div className={styles.projectName}>
                        {task.project.name}
                      </div>
                      <FontAwesomeIcon icon={faChevronDown} />
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
                    詳細
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
