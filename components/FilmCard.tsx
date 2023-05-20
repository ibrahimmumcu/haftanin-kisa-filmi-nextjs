import Image from "next/image";
import Link from "next/link";
import { Film } from "../interfaces/film.interface";
import styles from "../styles/FilmCard.module.scss";

type FilmCardProps = {
  film: Film;
};

export default function FilmCard({ film }: FilmCardProps) {
  return (
    <Link
      href={`/film/${encodeURIComponent(film.link)}`}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <div className={styles.imageContainer}>
        <Image
          alt={`${film.title} poster`}
          src={film.featuredImage}
          fill={true}
          style={{ objectFit: "cover" }}
        ></Image>
        <div className={styles.title}>{film.title}</div>
      </div>
    </Link>
  );
}
