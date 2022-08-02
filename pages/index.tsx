import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import FilmCard from "../components/FilmCard";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const Home: NextPage = () => {
  const { data, error } = useSWR(
    "/api/all?page=1&sortBy=latest&perPage=10000",
    fetcher
  ) as { data: { data: any[]; counter: number }; error: any };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Haftanın Kısa Filmi - Next</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.filmCardContainer}>
          {data.data.map((film) => (
            <FilmCard key={film.link} film={film} />
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
