import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Skeleton.module.scss";

export default function Skeleton() {
  return (
    <div className={styles.filmCard}>
      <div className={`${styles.imageContainer} ${styles.skeletonBox}`}></div>
    </div>
  );
}
