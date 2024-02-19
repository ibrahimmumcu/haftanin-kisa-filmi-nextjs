import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Film } from "../interfaces/film.interface";
import styles from "../styles/FilmPlayer.module.scss";
import { parse } from "node-html-parser";
import Head from "next/head";

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

  const addAutoPlay = () => {
    if (film.videoEmbed.length === 0) {
      return;
    }

    const root = parse(film.videoEmbed);
    const iframe = root.querySelector("iframe");

    let src = iframe?.attributes?.src as string;
    if (iframe?.attributes.src.indexOf("autoplay") === -1) {
      const char = src.indexOf("?") > -1 ? "&" : "?";
      src = src + `${char}autoplay=1`;
    }

    iframe?.setAttribute("src", src);
    iframe?.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");

    film.videoEmbed = iframe?.toString() as string;
  };

  addAutoPlay();

  film.featuredImageFileName = film.featuredImage.replace(/[\#\?].*$/, '').replace(/^.*[\\\/]/, '');
  film.featuredImageFileLocation = `/images/${film.featuredImageFileName}`;

  return (
    <>
      <Head>
        <title>Haftanın Kısa Filmi: {film.title}</title>
        <meta property="og:title" content={`Haftanın Kısa Filmi: ${film.title}`} key="title" />
        <meta
          name="description"
          content={`${film.description}`}
        />
      </Head>
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Image
          alt={`${film.title} poster`}
          src={film.featuredImageFileLocation}
          fill={true}
          style={{ objectFit: "cover" }}
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
            <Link
              href={`https://filmloverss.com/${film?.link}`}
              passHref
              target="_blank"
              rel="noreferrer"
            >
              Devamı
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
