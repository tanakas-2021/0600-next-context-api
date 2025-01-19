"use client";
import styles from "./page.module.scss";
import React from "react";
import {
  faCalendar,
  faCodeCommit,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <h2 className={styles.title}>プロジェクト</h2>
        </div>
        <div className={styles.body}>
          <div className={styles.projectsHeader}>
            <p className={styles.title}>1/1(3件)</p>
          </div>
          <ul className={styles.projectList}>
            <li>
              <a href="/projects/programming" className={styles.cardAnchor}>
                <div
                  className={styles.card}
                  style={{ borderLeft: `5px solid rgba(0, 0, 140, 0.6)` }}
                >
                  <div className={styles.cardHeader}>
                    <h2
                      className={styles.cardTitle}
                      style={{ color: `5px solid rgba(0, 0, 140, 0.6)` }}
                    >
                      プログラミング
                    </h2>
                    <div className={styles.cardDeadline}>
                      <FontAwesomeIcon icon={faCalendar} />
                      <span className={styles.cardDeadlineDate}>12/25</span>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardGoal}>
                      <div>フロントエンドエンジニアとして就職</div>
                    </div>
                    <div className={styles.shouldbe}>
                      <div>エンジニアとして学習</div>
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    <div className={styles.cardStats}>
                      <div className={styles.cardMilestone}>
                        <span>
                          <FontAwesomeIcon icon={faCodeCommit} />
                        </span>
                        <span className={styles.cardStatsText}>4</span>
                      </div>
                      <div className={styles.cardTask}>
                        <span className={styles.cardIcon}>
                          <FontAwesomeIcon icon={faFile} />
                        </span>
                        <span className={styles.cardStatsText}>30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
