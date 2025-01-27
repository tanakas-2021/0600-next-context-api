"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./page.module.scss";

const Page = () => {
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
            <div className={styles.tableRow}>
              <div className={`${styles.tableCell} ${styles.tableCellTask}`}>
                <div className={styles.taskContent}>タスク名</div>
              </div>
              <div className={`${styles.tableCell} ${styles.tableCellProject}`}>
                <div className={styles.projectContent}>
                  <div className={styles.projectName}>プログラミング</div>
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>
              <div className={`${styles.tableCell} ${styles.tableCellStatus}`}>
                ステータス名
              </div>
              <div
                className={`${styles.tableCell} ${styles.tableCellDeadline}`}
              >
                2025/01/04
              </div>
              <div className={`${styles.tableCell} ${styles.tableCellDetail}`}>
                詳細
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}></div>
      </div>
    </>
  );
};

export default Page;
