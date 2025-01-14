"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import styles from "./page.module.scss";
import React from "react";

const Page = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Sidebar/>
        <div className={styles.mainContents}></div>
      </main>
    </>
  );
};

export default Page;
