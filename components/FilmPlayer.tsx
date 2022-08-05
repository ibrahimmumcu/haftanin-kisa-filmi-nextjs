import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Film } from "../interfaces/film.interface";
import styles from "../styles/FilmPlayer.module.scss";

type FilmCardProps = {
  film: Film;
};

export default function FilmPlayer({ film }: FilmCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const [isChecked, setChecked] = useState(false);

  const startPlaying = () => {
    setIsPlaying(true);
    setChecked(true);
    setTimeout(() => {
      setChecked(false);
    }, 500);
  };

  const addAutoPlayToIframe = () => {
    const parser = new DOMParser();
    var parsedIframe = parser.parseFromString(film.videoEmbed, "text/html");
    let iframe = parsedIframe.getElementsByTagName("iframe");

    if (iframe?.length === 0) {
      return;
    }

    let src = iframe[0].src;
    const paramMergerChar = src.indexOf("?") > -1 ? "&" : "?";
    const autoPlayUrlString = film.videoEmbed.replace(
      src,
      src + paramMergerChar + "autoplay=1"
    );

    film = {
      ...film,
      videoEmbed: autoPlayUrlString,
    };

    const allowAttr = iframe[0].allow;
    if (allowAttr.length === 0) {
      film.videoEmbed = film.videoEmbed.replace(
        "></iframe>",
        ' allow="autoplay; fullscreen"></iframe>'
      );
    }
  };

  //addAutoPlayToIframe();

  return (
    <>
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Image
          alt={`${film.title} poster`}
          src={film.featuredImage}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className={styles.play} onClick={startPlaying}>
        <svg
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </div>

      <div className={`${styles.content} ${isPlaying ? styles.isPlaying : ""}`}>
        <div className={styles.info}>
          <h1>{film?.title}</h1>
          <div className={styles.description}>
            {film?.description}
            <Link href={`https://filmloverss.com/${film?.link}`} passHref>
              <a target="_blank" rel="noreferrer">
                Devamı
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${styles.curtain} ${isPlaying ? styles.isPlaying : ""}  ${
          isChecked ? styles.isChecked : ""
        }`}
      >
        <div className={styles.curtainWrapper}>
          <div
            className={`${styles.curtainPanel} ${styles.curtainPanelLeft}`}
          ></div>

          <div className={styles.curtainContent}>
            <div className={styles.player}>
              {isPlaying && (
                <div
                  className={styles.videoWrapper}
                  dangerouslySetInnerHTML={{ __html: film.videoEmbed }}
                ></div>
              )}
            </div>
          </div>

          <div
            className={`${styles.curtainPanel} ${styles.curtainPanelRight}`}
          ></div>
        </div>
      </div>
    </>
  );
}
