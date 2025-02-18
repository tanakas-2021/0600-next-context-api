"use client";
import styles from "./page.module.scss";
import React, { useEffect, useState} from "react";
import { fetchTasks } from "@/services/api";
import { PageInfo, Task } from "@/services/api";
import { TaskRow } from "@/components/taskRow";

const Page = () => {
  const maxCountOptions = [20, 50, 100];
  const [maxCount, setMaxCount] = useState(20);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const endPage = pageInfo && Math.ceil(pageInfo.totalCount / pageInfo.limit);
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
              return <TaskRow key={task.id} task={task} setTasks={setTasks} />;
            })}
          </div>
        </div>
        <div className={styles.footer}></div>
      </div>
    </>
  );
};
export default Page;
