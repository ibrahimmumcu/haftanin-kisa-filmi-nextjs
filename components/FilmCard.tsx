import Image from "next/image";
import Link from "next/link";
import { Film } from "../interfaces/film.interface";
import styles from "../styles/FilmCard.module.scss";

type FilmCardProps = {
  film: Film;
};

export default function FilmCard({ film }: FilmCardProps) {
  return (
    <div className={styles.imageContainer}>
      <Link href={`/film/${encodeURIComponent(film.link)}`}>
        <div>
          <Image
            src={film.featuredImage}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          ></Image>
          <div className={styles.title}>{film.title}</div>
        </div>
      </Link>
    </div>
  );
}
