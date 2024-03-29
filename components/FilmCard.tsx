import Image from "next/image";
import Link from "next/link";
import { Film } from "../interfaces/film.interface";
import styles from "../styles/FilmCard.module.scss";

type FilmCardProps = {
  film: Film;
};

export default function FilmCard({ film }: FilmCardProps) {
  film.featuredImageFileName = film.featuredImage.replace(/[\#\?].*$/, '').replace(/^.*[\\\/]/, '');
  film.featuredImageFileLocation = `/images/${film.featuredImageFileName}`;
  return (
    <Link
      href={`/film/${encodeURIComponent(film.link)}`}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <div className={styles.imageContainer}>
        <Image
          alt={`${film.title} poster`}
          src={film.featuredImageFileLocation}
          fill={true}
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        ></Image>
        <div className={styles.title}>{film.title}</div>
      </div>
    </Link>
  );
}
