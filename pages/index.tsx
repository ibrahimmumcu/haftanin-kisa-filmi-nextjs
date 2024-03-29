import type { NextPage } from "next";
import Head from "next/head";
import FilmCard from "../components/FilmCard";
import styles from "../styles/Home.module.scss";
import Header from "../components/Header";
import Skeleton from "../components/Skeleton";
import Footer from "../components/Footer";
import { Film } from "../interfaces/film.interface";

const Home: NextPage = ({ films }: any) => {
  return (
    <>
      <Header page="" />

      <div className={styles.container}>
        <Head>
          <title>Haftanın Kısa Filmi</title>
          <meta name="description" content="En iyi kısa filmleri izle." />
          <link rel="icon" href="/icons/favicon.ico" />
          <link rel="icon" type="image/png" href="/icons/icon-48x48.png"></link>
        </Head>

        <div className={styles.filmCardContainer}>
          {(() => {
            if (!films) {
              return (
                <>
                  {[...Array(30)].map((x, i) => (
                    <Skeleton key={i} type="listPage" />
                  ))}
                </>
              );
            } else {
              return (
                <>
                  {films.map((film: Film) => (
                    <FilmCard key={film.link} film={film} />
                  ))}
                </>
              );
            }
          })()}
        </div>
      </div>

      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const url = `https://next.haftaninkisafilmi.com/api/all?page=1&sortBy=latest&perPage=10000`;
  const res = await fetch(url);
  const data = await res.json();
  const films = data.data;

  return {
    props: {
      films,
    },
  };
}

export default Home;
