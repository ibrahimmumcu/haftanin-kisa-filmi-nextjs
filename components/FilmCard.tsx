import Image from "next/image";
import { Film } from "../interfaces/film.interface";
import styles from "../styles/FilmCard.module.scss";

type FilmCardProps = {
  film: Film;
};

export default function FilmCard({ film }: FilmCardProps) {
  return (
    <div className={styles.imageContainer}>
      <Image
        height={240}
        width={360}
        src={film.featuredImage}
        layout="fixed"
      ></Image>
      <div className={styles.title}>{film.title}</div>
    </div>
  );
}

/*
export default function ProjectLink({ project }) {
  return (
    <div id={project.slug} className={LayoutStyles.ProjectLink}>
      <Link href={`/project/${project.slug}`}>{project.title}</Link>:{' '}
      <span>{project.description}</span>
    </div>
  );
}
*/
