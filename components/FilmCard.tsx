import Image from "next/image";
import styles from "../styles/FilmCard.module.scss";

export default function FilmCard({}) {
  return (
    <div className={styles.imageContainer}>
      <Image
        height={240}
        width={360}
        src="https://i0.wp.com/filmloverss.com/wp-content/uploads/2021/09/kiss-of-the-rabbit-filmloverss-e1632838779262.jpg?fit=900%2C600&ssl=1"
      ></Image>
      <div className={styles.title}>Test</div>
    </div>
  );
}
