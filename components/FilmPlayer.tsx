import Image from "next/image";
import Link from "next/link";
import { Film } from "../interfaces/film.interface";
import styles from "../styles/FilmPlayer.module.scss";

type FilmCardProps = {
  film: Film;
};

export default function FilmPlayer({ film }: FilmCardProps) {
  return (
    <>
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Image
          alt="Mountains"
          src={film.featuredImage}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </>
  );
}
