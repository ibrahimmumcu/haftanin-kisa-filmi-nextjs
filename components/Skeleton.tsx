import styles from "../styles/Skeleton.module.scss";

type SkeletonProps = {
  type: string;
};

export default function Skeleton({ type }: SkeletonProps) {
  return (
    <>
      {(() => {
        if (type === "filmDetail") {
          return (
            <div className={styles.featured}>
              <div className={styles.content}>
                <div className={`${styles.title} ${styles.skeletonBox}`}></div>
                <br />
                <div
                  className={`${styles.description} ${styles.skeletonBox}`}
                ></div>
                <br />
                <div
                  className={`${styles.description} ${styles.skeletonBox}`}
                ></div>
                <br />
                <div
                  className={`${styles.description} ${styles.skeletonBox}`}
                ></div>
              </div>
            </div>
          );
        } else {
          return (
            <div className={styles.filmCard}>
              <div
                className={`${styles.imageContainer} ${styles.skeletonBox}`}
              ></div>
            </div>
          );
        }
      })()}
    </>
  );
}
