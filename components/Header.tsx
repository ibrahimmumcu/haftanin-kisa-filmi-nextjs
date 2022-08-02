import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Header.module.scss";

type HeaderProps = {
  page: string;
};

export default function Header({ page }: HeaderProps) {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 0);
    });
  }, []);

  return (
    <div className={`${styles.header} ${scroll ? styles.scrolled : ""}`}>
      <div
        className={`${styles.headerContainer} ${
          page === "movie" ? styles.movie : ""
        }`}
      >
        <Link href="/">
          <div className={styles.logo} style={{ cursor: "pointer" }}>
            <svg
              width="333"
              height="386"
              viewBox="0 0 333 386"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="115" width="256" height="128" fill="#F0C75E"></rect>
              <circle cx="80" cy="48" r="48" fill="#D6230D"></circle>
              <circle cx="198" cy="48" r="36" fill="#02416A"></circle>
              <line
                x1="101.658"
                y1="256.463"
                x2="3.15206"
                y2="382.544"
                stroke="black"
                strokeWidth="8"
              ></line>
              <line
                x1="252.354"
                y1="382.544"
                x2="153.848"
                y2="256.463"
                stroke="black"
                strokeWidth="8"
              ></line>
              <path
                d="M285 179L321 137.431V220.569L285 179Z"
                fill="#EC6840"
              ></path>
            </svg>
            <span>logo</span>
          </div>
        </Link>
      </div>
      {page !== "movie" && <div className={styles.hiddenHeader}></div>}
    </div>
  );
}
