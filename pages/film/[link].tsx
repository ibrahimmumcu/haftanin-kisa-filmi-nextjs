import { Film } from "../../interfaces/film.interface";
import Header from "../../components/Header";
import FilmPlayer from "../../components/FilmPlayer";
import Skeleton from "../../components/Skeleton";
import homeStyles from "../../styles/Home.module.scss";
import Footer from "../../components/Footer";
import FilmCard from "../../components/FilmCard";
import Head from "next/head";

export default function FilmDetail({ film, randomFilms }: any) {
  const pageTitle = `Haftanın Kısa Filmi: ${film.title}`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="title" />
        <meta name="description" content={film.description} />
      </Head>
      <Header page="movie" />

      {(() => {
        if (!film) {
          return (
            <>
              <Skeleton type="filmDetail" />
              {[...Array(60)].map((x, i) => (
                <Skeleton key={i} type="listPage" />
              ))}
            </>
          );
        } else {
          return (
            <>
              <FilmPlayer key={film?.link} film={film as Film} />
              <div className={homeStyles.container}>
                <div className={homeStyles.sectionTitle}>
                  <span>Rastgele Filmler </span>
                  <span className={homeStyles.right}></span>
                </div>

                <div className={homeStyles.filmCardContainer}>
                  {randomFilms?.map((film: Film) => (
                    <FilmCard key={film.link} film={film} />
                  ))}
                </div>
              </div>
            </>
          );
        }
      })()}

      <Footer />
    </>
  );
}

export async function getStaticProps({ params }: any) {
  const link = params.link;
  const url = `https://next.haftaninkisafilmi.com/api/film/${link}`;
  const film = (await fetch(url).then((res) => res.json())) as Film;

  const allUrl = `https://next.haftaninkisafilmi.com/api/all?page=1&sortBy=latest&perPage=10000`;
  const data = await fetch(allUrl).then((res) => res.json());
  const films = data.data as Film[];
  const copyFilms = [...films];
  const shuffled = copyFilms.sort(() => 0.5 - Math.random());
  const randomFilms = shuffled.slice(0, 9) as Film[];

  return {
    props: {
      film,
      randomFilms,
    },
  };
}

export async function getStaticPaths() {
  const url = `https://next.haftaninkisafilmi.com/api/all?page=1&sortBy=latest&perPage=10000`;

  const data = await fetch(url).then((res) => res.json());
  const films = data.data as Film[];
  return {
    paths: films.map((film: Film) => {
      const link = film.link;
      return {
        params: {
          link,
        },
      };
    }),
    fallback: false,
  };
}
