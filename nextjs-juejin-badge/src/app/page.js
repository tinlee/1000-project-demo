"use client";
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get("/database/user.json").then((res) => {
      setUser(Object.values(res.data));
    });
  }, []);

  return (
    <div className={styles.container}>
      {user.map((item) => {
        return (
          <div key={item.user_id} className={styles.user}>
            <div className={styles.header}>
              <div className={styles.headerImage}>
                <img src={item.avatar_large} />
              </div>
              <div className={styles.userName}>{item.user_name}</div>
            </div>
            <div className={styles.bradges}>
              {item.bradges.map((bg, ind) => {
                return (
                  <div key={ind} className={styles.bradgesItem}>
                    <img src={"/bradge/" + bg.icon} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
